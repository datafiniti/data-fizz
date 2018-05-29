let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

const startingURL = "https://www.amazon.com/" // Start from Amazon homepage.
let bookList = [];

axios.get(startingURL)
  .then((response) => {
    if(response.status === 200) {
      console.log("Hello Amazon!");
      let $ = cheerio.load(response.data);
      let products = $('[data-sgproduct]')
      for (let i = 0; i < products.length; i++) {
        let asin = JSON.parse(products[i].attribs['data-sgproduct']).asin;
        if (/\d{10}/.test(asin)) {  // Check if the ASIN is 10-digit numeric-only string.
          bookList.push("https://www.amazon.com/dp/" + asin);
        }
      }
      console.log(`Found ${bookList.length} books.`)
      // retrieveInfo('https://www.amazon.com/dp/0679805273') // This book fails to retrieve.
      for (let i = 0; i < bookList.length; i++) {
        console.log(`Initiating: ${bookList[i]}`)
        retrieveInfo(bookList[i])
      }
    }
  }, (err) => console.log(err) )

// const uri = "https://www.amazon.com/dp/1501180983"
// const uri = "https://www.amazon.com/dp/1628600160"
const url = "https://www.amazon.com/dp/1587676109"

class Book {
  constructor(id, name, price, description, dimensions, imageURLs, weight, sourceURL) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.dimensions = dimensions;
    this.imageURLs = imageURLs;
    this.weight = weight;
    this.sourceURL = sourceURL;
  }  
}

const retrieveInfo = (uri) => {
  axios.get(uri).then((response) => {
    if(response.status === 200) {
        let $ = cheerio.load(response.data);  // Store the response data.
        let name = $('#productTitle').text(); // Retrieve the book title.
        // let desc = $($('noscript:nth-child(2)')[0].childNodes[0].data).text().replace(/[\n\t]/g,'');  // Description of the book comes from the 2nd noscript element. Once found, text is extracted, and regex replace to remove carriage returns and leading/trailing empty spaces.
        
        let descHTML = $.createElement('div');
        descHTML.innerHTML = $('noscript:nth-child(2)')[0].childNodes[0].data
        let desc = descHTML.textContent.replace(/[\n\t]/g,'');  // Description of the book comes from the 2nd noscript element. Once found, text is extracted, and regex replace to remove carriage returns and leading/trailing empty spaces.
        
        let price = parseFloat($('#buyBoxInner').find("span.a-text-strike").text().replace(/\$/g,'')).toFixed(2); // List price of the product is found inside buybox, where the strikethrough is applied. Retain 2 decimal places for proper format.
        let productDetails =  $('#productDetailsTable').find('li'); // For ASIN ID, dimensions and weight, first locate the product details section.
        let id = productDetails[3].children[1].data.replace(/^[ \t(]+/g,'');  // From product details, 4th item is the ISBN-10 which matches the ASIN ID of the book.
        let dimensions = productDetails[5].children[1].data.split('\n')[1].replace(/^[ \t]+/g,'');  // From product details, 6th item is the dimensions. Once found, clean up the text.
        let weight = productDetails[6].children[1].data.replace(/^[ \t(]+|[()]/g,''); // From product details, 7th item is the shipping weight. Once found, clean up the text.
        let imageURLs = Object.keys(JSON.parse($("#imgBlkFront").attr("data-a-dynamic-image")));  // Image URLs can be located from img with id="imgBlkFront".

        console.log(`Retrieving information on book id: ${id}`)
        
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

        let book = new Book(id, name, price, desc, dimensions, imageURLs, weight, uri);
        fs.writeFile(`books/book_${id}.txt`, JSON.stringify({"product":book}), {encoding:"utf8"}, function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("The file was saved!");
          }
        }); 

       
      }
    }, (err) => console.log(err) );
}
