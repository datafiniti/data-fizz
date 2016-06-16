var express = require('express');
var cheerio = require('cheerio'), $;
var fs = require('fs');
var books = [], i = 1;
var title, author, authorSection, price, numPrices, shipping_weight, isbn, doneSearchingList, listItem;

//If we were scraping outside webpages, an npm module called 'axios'
//could be used to fetch the webpage's html. It is a promise based http tool for node

//I made a function readBook, which is called recursively, because I am using 'fs' to read the html files
//and the fs.readFile function is asynchronous. An alternative would be using the synchronous version
//inside of a simple for loop or while loop. This would be less 'expensive', in terms of not building
//up the call stack, but would hold up the rest of the program
function readBook(bookNum){

  fs.readFile('./data/book' + bookNum + '.html', 'utf8', function(err, data){

    if(err) throw err;

    $ = cheerio.load(data);

    title = $('#btAsinTitle').text();

    authorSection = $('span','.buying').find('a');
    //had to 'slice' the first or first and second (in the case of more than one author)
    //element(s) out because there was an irrelevant piece of information at the end of
    //the authorSection selection
    if(authorSection.length > 2){
      author = authorSection.slice(0, 1).text() + ', ' + authorSection.slice(1, 2).text();
    } else {
      author = authorSection.slice(0, 1).text();
    }


    numPrices = $('.bb_price').length;
    //there is a case, for book #9 for example, where there are several prices,
    //such as price for rent, so need to account for that
    if(numPrices > 1){
      price = $('.bb_price').slice(2, 3).text();
    } else {
      price = $('.bb_price').text();
    }

    price = price.replace(/\s/g, ''); //selection came with a lot of whitespace - this cleans it up
    price = price + ' USD';

    //The isbn and shipping details are part of a table/list of 'Product Details', and I could not
    //target them individually, so I had to iterate through every list item and check each string
    //with the conditionals below

    doneSearchingList = false;
    //I have a doneSearchingList boolean because there are some very lengthy details that come
    //after the 'shipping weight' and I did not want to waste time searching those strings for
    //the matching 'ISBN-10' or 'Shipping Weight' words

    $('table', '#detail-bullets').find('li').each(function(i, elem){
      listItem = $(this).text();

      if(!doneSearchingList){
        if(listItem.includes('ISBN-10')){
          isbn = listItem.substr(-10); //original string 'ISBN-10: 140006922X'
          //I was trying to convert ISBN to Number format but I don't believe it is possible in Javascript to have
          //a value of the type 'number' and it include leading zeros
        } else if(listItem.includes('Shipping Weight')){
          shipping_weight = listItem.substr(17, 10); //original string 'Shipping Weight: 1.2 pounds (View shipping rates and policies)'
          //All weights from the 20 book samples are under 10 pounds and are measured to the tenth place.
          //If we had to account for heavier books, it would take just a bit more of logic
          doneSearchingList = true;
        }
      }

    });

    books.push({'title': title, 'author': author, 'price': price, 'shipping_weight': shipping_weight, 'isbn-10': isbn});

    if(bookNum < 20){
      bookNum++;
      readBook(bookNum);
    }

  });
}

readBook(1);
