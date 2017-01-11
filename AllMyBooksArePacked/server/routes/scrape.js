const express = require('express');
const router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios');


router.post('/scrape', (req, res, next) => {
  axios.get(req.body.url)
  .then(function(response){
    let logs = []
    let $ = cheerio.load(response.data)
      $('tr').each(function(index){
        
        //Setting the inital game object that we will overwrite with data about the book
        let json = { }
        
        logs.push(json)
      })
    console.log(logs)
  })
})

module.exports = router;