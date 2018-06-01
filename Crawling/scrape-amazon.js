// Require packages needed for web scraping and writing to output file.
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); 

// Start from Amazon homepage.
const startingURL = "https://www.amazon.com/" 
// const startingURL = "https://www.amazon.ca/" // Test it on Amazon Canada homepage.

// Define class product with all the informations desired.
class Product {
  constructor(id, name, price, description, dimensions, imageURLs, weight, sourceURL, otherIDs, retrieved) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.dimensions = dimensions;
    this.imageURLs = imageURLs;
    this.weight = weight;
    this.sourceURL = sourceURL;
    this.otherIDs = otherIDs;
    this.retrieved = retrieved;
  }    
}

// Define class for all scraper logic, including product name, description, price, dimensions, weight, image URLs. 
class Scraper {
  static findName($) {  // Product name is found inside the element with id = productTitle.
    let name = $('#productTitle')[0].children[0].data;
    return (name ? name : "Name not found");
  }

  static findDescription($) { // Product description is found inside the 2nd noscript element. 
    let desc = $($('noscript:nth-child(2)')[0].childNodes[0].data).text().trim();
    return (desc ? desc : "Description not found");
  }
      
  static findPrice($) { // List price of the product is found inside element with id = buybox, where the strikethrough is applied. 
    let price = parseFloat($('#buyBoxInner').find("span.a-text-strike").text().replace(/\$/g,'')).toFixed(2);  // Remove $ prefix and retain 2 decimal places for proper format.
    return (price ? price : "Price not found");
  }

  static findDetails($, string) { // Locate the product dimensions and shipping weight. Define the method that locates list element and bold element that contains a specified string. 
    let elemLi = $(`li:contains(${string})`); // Find the li element containing the string.
    let elemB = $(`b:contains(${string})`); // Find the b element containing the string.
    return (elemLi && elemB ? elemLi.text().replace(elemB.text(), "").trim() : `${string} not found`)
  }

  static findImageURLs($) { // Find image URLs from img tag with id="imgBlkFront".
    let imageURLs = Object.keys(JSON.parse($("#imgBlkFront").attr("data-a-dynamic-image")))
    return (imageURLs ? imageURLs : "Image URLs not found");
  }

  static findOtherIDs($) {  // Find all other ASINs in the page.
    // let idList = JSON.parse($("[data-a-carousel-options]").attributes[0].value).ajax.id_list;
    let idList = JSON.parse($("[data-a-carousel-options]")[0].attribs['data-a-carousel-options']).ajax.id_list.map(x => x.replace(/\:/,""));  // Remove the trailing colon from the product IDs
    return (idList ? idList : "No other product IDs found");
  }
}

let bookList = [];  // Start with an empty book list array.
let bookList2 = [];
let sampleBookList = [  // This list was retrieved by the homepage scraper initially.
  "https://www.amazon.com/dp/1501180983",
  "https://www.amazon.com/dp/0345816021",
  "https://www.amazon.com/dp/1400201659",
  "https://www.amazon.com/dp/1623158087",
  "https://www.amazon.com/dp/1594204225",
  "https://www.amazon.com/dp/0679805273"
];

const retrieveInfo = (uri) => {
  axios.get(uri).then((response) => {
    if(response.status === 200) {
      let $ = cheerio.load(response.data);  // Store the response data.
      let timestamp =   Math.round((new Date()).getTime()/1000) // Record the retrieval timestamp.
      let id = uri.slice(-10);  // Store the book ID by extracting the last 10 digits from the uri. This matches ASIN and ISBN-10.
      console.log(`${id}: Retrieving book information...`)

      let name =        Scraper.findName($); // Find the product name.
      let desc =        Scraper.findDescription($);  // Find product description.
      let price =       Scraper.findPrice($); // Find product list price.
      let dimensions =  Scraper.findDetails($, 'Product Dimensions');  // Find the product dimensions.
      let weight =      Scraper.findDetails($, 'Shipping Weight').replace(" (View shipping rates and policies)", "");  // Find shipping weight. This string contains additional trailing substring that needs to be removed.
      let imageURLs =   Scraper.findImageURLs($); // Find image URLs.
      
      let otherIDs =    Scraper.findOtherIDs($); // Find other product IDs from the page.
      otherIDs.splice(otherIDs.indexOf(id), 1)  // Remove the ID of this book.

      // If only interested in books, further filtering is done.
      let bookIDs = otherIDs.filter(x => x.match(/\d{10}/)) // Find only 10-digit numeric IDs.

      // Store all the information located into a book object, then output it to a file.
      let book = new Product(id, name, price, desc, dimensions, imageURLs, weight, uri, bookIDs, timestamp);
      fs.writeFile(`books/book_${id}.txt`, JSON.stringify({"product":book}), {encoding:"utf8"}, function(err) {
        console.log(err ? err : `${id}: The file was saved!`)
      }); 

      // Retrieve books in secondary findings. 
      // The following is a proof of concept, with minimal testing that demonstrates the scraper's functionality, but otherwise leads to uncontrolled process, which must be manually stopped from the terminal.
      bookList2 = bookList.concat(bookIDs);
      for (let i = 0; i < bookList2.length; i++) {
        retrieveInfo("https://www.amazon.com/dp/" + bookList2[i])
      }
    }
  }, (err) => console.log(err) );
}

// Start from the starting URL. Find all ISBNs from the starting page, then run retrieval loop to scrape product informations from all books found.
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