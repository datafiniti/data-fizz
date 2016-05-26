let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

// const uri = "https://www.amazon.com/dp/1501180983"
const uri = "https://www.amazon.com/dp/1628600160"

axios.get(uri)
  .then((response) => {
    if(response.status === 200) {
        let $ = cheerio.load(response.data); 
        let name = $('#productTitle').text();
        // let desc = $('#iframeContent');
        // console.log(Object.getOwnPropertyNames(desc));
        // console.log(desc.length)



        
        let price = $('#buybox').find("span.a-text-strike").text();
        let productDetails =  $('#productDetailsTable').find('li');       
        let dimensions = productDetails[5].children[1].data.split('\n')[1].replace(/^[ \t]+/g,'');
        let weight = productDetails[6].children[1].data.replace(/^[ \t(]+|[()]/g,'');
        // console.log(dimensions[5].children[0].data)
        // console.log(dimensions[6].children[0].data)

        let imageURLs = [];
        imageURLs.push(Object.keys(JSON.parse($("#imgBlkFront").attr("data-a-dynamic-image"))));

        console.log(`Name: ${name}`);
        console.log(`List Price: ${price}`)
        // console.log(`Description: ${desc}`);
        console.log(`Product Dimensions: ${dimensions}`)
        console.log(`Image URLs: ${imageURLs}`)
        console.log(`Weight: ${weight}`)
      }
    }, (error) => console.log(err) );