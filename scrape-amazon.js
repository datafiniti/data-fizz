let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

const uri = "https://www.amazon.com/dp/1501180983"

axios.get(uri)
  .then((response) => {
    if(response.status === 200) {
        let $ = cheerio.load(response.data); 
        let name = $('#productTitle').text();
        let desc = $('#iframeContent').text();
        let price;
        let dimensions;
        let imageURLs;
        let weight;

        console.log(`Name: ${name}`);
        console.log(`List Price: ${price}`)
        console.log(`Description: ${desc}`);
        console.log(`Product Dimensions: ${dimensions}`)
        console.log(`Image URLs: ${imageURLs}`)
        console.log(`Weight: ${weight}`)
      }
    }, (error) => console.log(err) );