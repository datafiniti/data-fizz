// Instructions: To run test if this properly works, run the terminal ' command node app.js ' 

// Note: This assumes that you are far enough in the directory, so that pwd will show the following
// appended to wherever you've cloned this to your desktop: DataFizz/AllMyBooksArePacked/src 
// This also assumes that you have a working version of node.js installed on your computer.

// Config
const fs = require('fs');
const cheerio = require('cheerio');

//Turn the data directory into an array.
const directory = fs.readdirSync(__dirname + '/../data/').map((a) => '../data/' + a );

//Map over the directory array and read all the files into an array format
const allFiles = directory.map((a) => fs.readFileSync(a,'utf-8'));

// Load all the files into memory using cheerio.
var relevantData = allFiles.map((a) => { 
 const $ = cheerio.load(a);
 var ship = $('li').filter((i, el) => $(el).html().includes('Shipping Weight')).text();
 const test = { 
  Title: $('#btAsinTitle').text().trim(),
  Author:$('.byLinePipe', '.buying').siblings()[0].children[0].data ,
  Price: $('.bb_price', '#bb_section').text().trim(),
  ShippingWeight: parseFloat(ship.replace(/,/g,'').replace(/^[^-0-9]*/,'')),
  ISBN: $('li').filter((i, el) => $(el).html().includes('ISBN-10')).text()
  };
 return test;
});

//Create a container for everything
const dataContainer = {};


//This creates the boxes with their appropriate data.
class CreateBox {
constructor(id,totalWeight,contents) {
  this.id = id;
  this.totalWeight = totalWeight;
  this.contents = contents;
  }
}

//This packs the boxes.
const boxPacker = (data,weightLimit) => {
  let boxCount = 1;
  let weight = 0;
  let books = [];
  let savePlace = 0;
    for(var i = 0; i < data.length; i++) {
      if((weight + data[i].ShippingWeight) < weightLimit){
        weight += (data[i].ShippingWeight);
      } else {
        if(!savePlace){
          savePlace = i;
          books.push(data.slice(0,i));
          dataContainer['Box ' + boxCount] = new CreateBox(boxCount,weight.toFixed(1),books);
          boxCount += 1;
          weight = data[i].ShippingWeight;
          books = [];
        } else {
          books.push(data.slice(savePlace,i));
          dataContainer['Box ' + boxCount] = new CreateBox(boxCount,weight.toFixed(1),books);
          boxCount += 1;
          savePlace = i;
          weight = data[i].ShippingWeight;
          books = [];
        }
      }
  }
    books.push(data.slice(savePlace,data.length));
    dataContainer['Box ' + boxCount] = new CreateBox(boxCount,weight.toFixed(1),books);
    boxCount+=1;
};

//Call the boxPacker to pack the relevantData into boxes and add them to the dataContainer
boxPacker(relevantData, 10);

//This writes the contained and organized data to a .json file.
fs.writeFileSync('results.json',JSON.stringify(dataContainer));
