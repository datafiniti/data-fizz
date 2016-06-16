//I made a module containing the scraping methods with a public API, in case we
//had sensitive information we wanted to hid inside of this function. It also
//abstracts away the implementation details.
//It is an immediately invoked function so that we can have the api

//bookScraper is like a class, in that it gives us encapsulation and the possiblity
//of private variables/functions

var bookScraper = (function bookScraper () {

  var publicAPI = {
    getTitle: getTitle,
    getAuthor: getAuthor,
    getPrice: getPrice,
    getISBNandShipping: getISBNandShipping
  };

  return publicAPI;

  function getTitle($){
    return $('#btAsinTitle').text();
  }

  function getAuthor($){
    var author, authorSection;
    authorSection = $('span','.buying').find('a');
    //had to 'slice' the first or first and second (in the case of more than one author)
    //element(s) out because there was an irrelevant piece of information at the end of
    //the authorSection selection
    if(authorSection.length > 2){
      author = authorSection.slice(0, 1).text() + ', ' + authorSection.slice(1, 2).text();
    } else {
      author = authorSection.slice(0, 1).text();
    }
    return author
  }

  function getPrice($) {
    var price, numPrices;

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
    return price;
  }

  function getISBNandShipping($){
    var doneSearchingList, listItem, isbn, shipping_weight;

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
    return {isbn: isbn, shipping_weight: shipping_weight};
  }

})();

module.exports = bookScraper;
