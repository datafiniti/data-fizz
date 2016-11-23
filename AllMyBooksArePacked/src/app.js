// Instructions: 
// 1) open an instance of your terminal
// 2) Follow the instructions at https://nodejs.org/en/download/package-manager/ for your respective OS. note: it will
//    ask you to type some stuff in the terminal..hence step 1.
// 3) Navigate to the following path ' DataFizz/AllMyBooksArePacked ' using cd. note: this will be prepended by your relevant desktop paths.
// 4) Type  ' npm install '. This is critical, because it contains files relevant to running this application. It will install the various
//    dependencies that exist in package.json
// 5) cd into the following path ' DataFizz/AllMyBooksArePacked/src '
// 6) Assuming you've properly installed node.js and successfully ran npm install for dependencies, type the following:
//    ' node app.js '. note: this will run the application you see below. If this worked properly, you should see a new file appear in the src
//    directory called results.json. 
// 7) Incase you didn't check if the file already preexisted there, delete it and simply run the command in step 6 again.
// 9) Bonus: If you'd like to see the action happening in a more step-by-step fashion, uncomment the console.log one line 36.     

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
  // console.log(test);
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
