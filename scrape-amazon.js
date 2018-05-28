let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

// const uri = "https://www.amazon.com/dp/1501180983"
// const uri = "https://www.amazon.com/dp/1628600160"
const uri = "https://www.amazon.com/dp/1587676109"

class Book {
  constructor(id, name, price, description, dimensions, imageURLs, weight) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.dimensions = dimensions;
    this.imageURLs = imageURLs;
    this.weight = weight;
  }
}

axios.get(uri)
  .then((response) => {
    if(response.status === 200) {
        let $ = cheerio.load(response.data); 
        let name = $('#productTitle').text();
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

        let desc = $($('noscript:nth-child(2)')[0].childNodes[0].data).text().replace(/[\n\t]/g,'');
        let price = parseFloat($('#buyBoxInner').find("span.a-text-strike").text().replace(/\$/g,'')).toFixed(2);
        let productDetails =  $('#productDetailsTable').find('li');       
        let id = productDetails[3].children[1].data.replace(/^[ \t(]+/g,'');
        let dimensions = productDetails[5].children[1].data.split('\n')[1].replace(/^[ \t]+/g,'');
        let weight = productDetails[6].children[1].data.replace(/^[ \t(]+|[()]/g,'');
        let imageURLs = Object.keys(JSON.parse($("#imgBlkFront").attr("data-a-dynamic-image")));

        let book = new Book(id, name, price, desc, dimensions, imageURLs, weight);
        // fs.appendFileSync('amazon.txt', book);
        fs.writeFile("amazon.txt", JSON.stringify({"product":book}), {encoding:"utf8"}, function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("The file was saved!");
          }
        });
      }
    }, (error) => console.log(err) );