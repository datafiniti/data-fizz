let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs'); 

const uri = "https://www.amazon.com/dp/1501180983"

axios.get(uri)
  .then((response) => {
    if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); 
        console.log($('#productTitle').text());
      }
    }, (error) => console.log(err) );