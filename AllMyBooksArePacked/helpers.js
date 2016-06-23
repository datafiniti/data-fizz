/* Node Modules */
var fs = require('fs');

var helpers = {
  /* Grabs the book title out of the DOM */
  getTitle: function($) {
    var title = $('#btAsinTitle').text();

    return title;
  },

  /* Grabs the author out of the DOM */
  getAuthor: function($) {
    var author = $('.byLinePipe').prev('a').text();

    return author;
  },

  /* Grabs the price out of the DOM */
  getPrice: function($) {
    var price = $('#actualPriceValue').text() || $('.rentPrice').first().text();

    return price + ' USD';
  },

  /* Grabs the weight out of the DOM */
  getWeight: function($) {
    var weight = $('#productDetailsTable')
                  .find('li')
                  .filter(function() {
                    return $(this).find('b').text() === 'Shipping Weight:';
                  })
                  .text()
                  .split(' ')[2];

    return weight + ' pounds';
  },

  /* Grabs the ISBN out of the DOM */
  getISBN: function($) {
    var ISBN = $('#productDetailsTable')
                .find('li')
                .filter(function() {
                  return $(this).find('b').text() === 'ISBN-10:';
                })
                .text()
                .split(' ')[1];
    return Number(ISBN) || ISBN;
  }
}

/* Export the helpers */
module.exports = helpers;
