var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var HashMap = require('hashmap');
var router = express.Router();

/* GET html pages. */
router.get('/data', (req, res) => {
  var startPath = './data'; 
  var filter = '.html';
  var filesArray = [];
  if (!fs.existsSync(startPath)){
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for(var i=0; i<files.length; i++){
      var filename = path.join(startPath,files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()){
        fromDir(filename,filter);
      }
      else if (filename.indexOf(filter)>=0) {
        filesArray.push(filename);
      };
  };
  res.json(filesArray);
});

router.post('/scrape', (req, res) => {
    var url = 'http://localhost:8080/' + req.body.book;
    console.log(url);
    return new Promise((resolve, reject) => {
      request(url, (err, resp, body) => {
          if (err) return reject(err)

          $ = cheerio.load(body)
          var title, author, price, isbn10, shipping_weight, image

          title = $('#btAsinTitle').text()
          author = $('.buying > span > a').text()
          price = $(".bb_title:contains('New')").text().trim() == 'Buy New' ? $(".bb_price").last().text().trim() : '0.00'
          image = $("#holderMainImage").find('img').attr('src');

          var product_detail = new HashMap()
          var $productDetails = $('#productDetailsTable')
          var $tr = $productDetails.find('tr')
          var $td = $tr.children('td')
          var $content = $td.children('.content')
          var $ul = $content.children('ul')
          var $li = $ul.children('li')
          $li.each(function(i, item) {
             var element = $(this).html().split("</b>")
             element[0] = element[0].replace("<b>", "").trim()
             element[1] = element[1].trim()
             product_detail.set(element[0],element[1])
          })
          isbn10 = product_detail.get("ISBN-10:")
          shipping_weight = parseFloat(product_detail.get("Shipping Weight:").split("(")[0].trim().replace(/ pounds/g,'').trim());
          
          book = { 
            title : title, 
            author : author, 
            price : price, 
            isbn10: isbn10, 
            shipping_weight: shipping_weight,
            image: image
          }
          // respond with the final JSON
          resolve(res.json(book))
      })
    });
});

router.post('/stack', (req, res) => {
  var url = 'http://localhost:8080/data/book' + req.body.id + '.html';
  return new Promise((resolve, reject) => {
    request(url, (err, resp, body) => {
        if (err) return reject(err)

        $ = cheerio.load(body)
        var title, author, price, isbn10, shipping_weight, image

        title = $('#btAsinTitle').text()
        author = $('.buying > span > a').text()
        price = $(".bb_title:contains('New')").text().trim() == 'Buy New' ? $(".bb_price").last().text().trim() : '0.00'
        image = $("#holderMainImage").find('img').attr('src');

        var product_detail = new HashMap()
        var $productDetails = $('#productDetailsTable')
        var $tr = $productDetails.find('tr')
        var $td = $tr.children('td')
        var $content = $td.children('.content')
        var $ul = $content.children('ul')
        var $li = $ul.children('li')
        $li.each(function(i, item) {
           var element = $(this).html().split("</b>")
           element[0] = element[0].replace("<b>", "").trim()
           element[1] = element[1].trim()
           product_detail.set(element[0],element[1])
        })
        isbn10 = product_detail.get("ISBN-10:")
        shipping_weight = parseFloat(product_detail.get("Shipping Weight:").split("(")[0].trim().replace(/ pounds/g,'').trim());
        
        book = { 
          title : title, 
          author : author, 
          price : price, 
          isbn10: isbn10, 
          shipping_weight: shipping_weight,
          image: image
        }
        // respond with the final JSON
        resolve(res.json(book))
    })
  });
});

module.exports = router;