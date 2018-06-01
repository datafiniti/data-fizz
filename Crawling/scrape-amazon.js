// Require packages needed for web scraping and writing to output file.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 

// Start from Amazon homepage.
const startingURL = "https://www.amazon.com/" 
// const startingURL = "https://www.amazon.ca/" // Test it on Amazon Canada homepage.

// Define a class product with all the informations desired.
class Product {
  constructor(id, name, price, description, dimensions, imageURLs, weight, sourceURL, retrieved) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.dimensions = dimensions;
    this.imageURLs = imageURLs;
    this.weight = weight;
    this.sourceURL = sourceURL;
    this.retrieved = retrieved;
  }    
}

let bookList = [];  // Start with an empty book list array.
let sampleBookList = [  // This list was retrieved by the homepage scraper initially.
  "https://www.amazon.com/dp/1501180983",
  "https://www.amazon.com/dp/0345816021",
  "https://www.amazon.com/dp/1400201659",
  "https://www.amazon.com/dp/1623158087",
  "https://www.amazon.com/dp/1594204225",
  "https://www.amazon.com/dp/0679805273"
];

axios.get(startingURL)
  .then((response) => {
    if(response.status === 200) {
      console.log("Hello Amazon!");
      let $ = cheerio.load(response.data);
      let products = $('[data-sgproduct]')  // Find all elements that have attribute data-sgproduct. This includes the ASIN value of the product.
      for (let i = 0; i < products.length; i++) {
        let asin = JSON.parse(products[i].attribs['data-sgproduct']).asin;  // Parse the ASIN value from the attribute of the found element.
        if (/\d{10}/.test(asin)) {  // If the ASIN is 10-digit numeric-only string, this implies that the product is a book with that ISBN-10.
          bookList.push("https://www.amazon.com/dp/" + asin); // Store the url for the found book.
        }
      }
      console.log(`Found ${bookList.length} books from ${products.length} products shown on Amazon homepage.`)
      for (let i = 0; i < bookList.length; i++) {
        retrieveInfo(bookList[i])
      }
      
      if (bookList.length == 0) { // If no book is found, resort to the stored book list retrieved previously.
        console.log("No ISBNs could be retrieved from Amazon homepage. Running the remainder of operation from sample book list.");
        for (let i = 0; i < sampleBookList.length; i++) {
          retrieveInfo(sampleBookList[i])
        }
      }
    }
  }, (err) => console.log(err) 
)

// Locate the product dimensions and shipping weight.
// First define the function that locates list element and bold element that contains the string. 
const findDetails = ($, string) => {
  if ($(`li:contains(${string})`)) {
    // Once the list element is found, the target substring is found by removing the title encapsulated in bold tags, and subsequent trimming.
    return $(`li:contains(${string})`).text().replace($(`b:contains(${string})`).text(), "").trim();
  } else {
    return "Not found";
  }
}

const retrieveInfo = (uri) => {
  axios.get(uri).then((response) => {
    if(response.status === 200) {
      let $ = cheerio.load(response.data);  // Store the response data.
      let id = uri.slice(-10);  // Store the book ID by extracting the last 10 digits from the uri. This matches ASIN and ISBN-10.
      console.log(`${id}: Retrieving book information...`)

      // Find the product name.
      let infoName = $('#productTitle'); // Retrieve the book title.
      let name = "";
      if (infoName) {
        name = infoName.text();
      } else {
        console.log(`${id}: Name not found`);
      }

      // Find product description.
      let infoDesc = $($('noscript:nth-child(2)')[0].childNodes[0].data);  // Description of the book comes from the 2nd noscript element. Once found, text is extracted, and regex replace to remove carriage returns and leading/trailing empty spaces.
      let desc = "Not found";
      if (infoDesc.text()) {
        desc = infoDesc.text().replace(/[\n\t]/g,'')
      } else {
        console.log(`${id}: Description not found`);
      }

      // List price of the product is found inside buybox, where the strikethrough is applied. 
      // let price = parseFloat($('#buyBoxInner').find("span.a-text-strike").text().replace(/\$/g,'')).toFixed(2); // 
      let infoPrice = $('#buyBoxInner').find("span.a-text-strike");
      let price = 0;
      if (infoPrice.text()) {
        price = parseFloat(infoPrice.text().replace(/\$/g,'')).toFixed(2);  // Remove $ prefix and retain 2 decimal places for proper format.
      } else {
        console.log(`${id}: Price not found`);
      }
      
      
      let dimensions = findDetails($, 'Product Dimensions');  // Find the product dimensions.
      let weight = findDetails($, 'Shipping Weight').replace(" (View shipping rates and policies)", "");  // Find shipping weight. This string contains additional trailing substring that needs to be removed.

      // Find image URLs from img tag with id="imgBlkFront".
      let imageURLs = Object.keys(JSON.parse($("#imgBlkFront").attr("data-a-dynamic-image")));  

      let timestamp = Math.round((new Date()).getTime()/1000)
      // Store all the information located into a book object, and output it to a file.
      let book = new Product(id, name, price, desc, dimensions, imageURLs, weight, uri, timestamp);
      fs.writeFile(`books/book_${id}.txt`, JSON.stringify({"product":book}), {encoding:"utf8"}, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log(`${id}: The file was saved!`);
        }
      }); 
    }
  }, (err) => console.log(err) );
}





  

// const uri = "https://www.amazon.com/dp/1501180983"
// const uri = "https://www.amazon.com/dp/1628600160"
// const url = "https://www.amazon.com/dp/1587676109"     
        // Below attempts to traverse into iframe turned out futile.
        // let desc = $('iframe#bookDesc_iframe');
        // let desc = $('#bookDesc_iframe_wrapper')[0]
        // let desc = $('#iframeContent');
        // console.log(Object.getOwnPropertyNames(desc));
        // console.log($('#bookDescription_feature_div')[0].childNodes[5].childNodes[1]);
        // console.log($('#bookDescription_feature_div')[0].childNodes[5].childNodes[1].childNodes[1]);
        // console.log($('#postBodyPS')[0].childNodes[1]);
        // console.log($('#bookDesc_iframe_wrapper')[0] == $('#postBodyPS')[0].childNodes[1]);
        // console.log($('#bookDesc_iframe').contentDocument.childNodes[0].childNodes[1].childNodes[1])
        // console.log($('#bookDesc_iframe')[0].contentDocument)
        // console.log($('iframe#bookDesc_iframe').contentDocument.body.childNodes[1].innerHTML);
        // console.log($("#bookDesc_iframe_wrapper").length)
        // console.log(Object.getOwnPropertyNames($("#bookDesc_iframe_wrapper")));
        // console.log(Object.getOwnPropertyNames($("#bookDesc_iframe_wrapper")[0]));
        // console.log($("#bookDesc_iframe_wrapper")[0].parent);

        // // Using meta tag description
        // let desc = $("meta[name='description']")[0].attribs.content;
        // console.log(desc);