const cheerio = require('cheerio');
const fs      = require('fs');

let bookData = [];
let bookList = createList();

extractData(bookList);

function createList() {
  var list = [];
  for (var i = 1; i <= 20; i++){
    list.push(`book${i}.html`);
  }
  return list;
}

function extractData(list) {
  list.forEach(function(book){
    fs.readFile(`../data/${book}`, 'utf8', (err, html) => {
      if (err) { console.error(err); }
      const $ = cheerio.load(html);

      // Allows $ to ignore text within nested selectors
      $.fn.ignore = function(selector){
        return this.clone().find(selector||">*").remove().end();
      };

      let title, author, price, shipping_weight, isbn10;
      let json = {"title": "", "author": "", "price": "", "shipping_weight": "", "isbn-10": ""};

      // extract title and author
      $('#btAsinTitle').filter(function() {
        let data = $(this);
        title = data.ignore('span').text().trim();
        author = "";

        data.closest('.buying').find('span').find('a').each(function(i, elem){
          // handles multiple authors
          if (author) { author += ', ' + elem.children[0].data; }
          else { author = elem.children[0].data; }
        });

        json.title = title;
        json.author = author;
      });

      // extract price
      $('#actualPriceValue').filter(function() {
        let data = $(this);

        price = data.text() + ' USD';
        json.price = price;
      });

      $('#productDetailsTable').find('.content').find('li').filter(function() {
        let data = $(this);

        // extract shipping weight
        if (data.find('b').text().trim() === 'Shipping Weight:'){
          shipping_weight = data.ignore('b').ignore('a').text().trim().slice(0,-3);
          json.shipping_weight = shipping_weight;
        }

        // extract isbn-10
        if (data.find('b').text().trim() === 'ISBN-10:'){
          isbn10 = data.ignore('b').text().trim();
          json["isbn-10"] = isbn10;
        }
      });
      
      bookData.push(json);

      // when all data is extracted, create shipment.
      if (bookData.length === bookList.length){
        createShipment(bookData);
      }
    });
  });
}

function createShipment(items) {
  let shipment = [];
  let boxID = 1;
  items = sortItemsByWeight(items);

  while (items.length){
    createBox(10);
  }

  storeJSON(shipment, 'shipment.json');

  function createBox(maxWeight){
    let boxWeight = 0;
    let box = {"id": boxID++, "totalWeight": "", "contents": []};

    findItem();

    box.totalWeight = boxWeight.toFixed(1) + ' pounds';
    shipment.push({"box": box}); 

    function findItem(){
      for (var i = 0; i < items.length; i++){
        let weight = parseFloat(items[i].shipping_weight);
        if (boxWeight + weight <= maxWeight){
          boxWeight += weight;
          box.contents.push( items.splice(i, 1));
          findItem();
          break;
        }
      }
    }
  }
}

function sortItemsByWeight(items) {
  return items.sort( (a, b) => parseFloat(b.shipping_weight) - parseFloat(a.shipping_weight) );
}

function storeJSON(json, filename) {
  let file = JSON.stringify(json, null, 2);
  fs.writeFile(filename, file);
}
