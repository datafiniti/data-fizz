const cheerio = require('cheerio');
const fs      = require('fs');

let bookList = createList();
let bookData = [];

bookList.forEach(function(book){
  fs.readFile(`../data/${book}`, 'utf8', (err, html) => {
    console.log("-book:", book);
    if (err) { console.error(err); }
    const $ = cheerio.load(html);

    // Allows $ to ignore text within nested selectors
    $.fn.ignore = function(selector){
      return this.clone().find(selector||">*").remove().end();
    };

    let title, author, price, shipping_weight, isbn10;
    let json = {title: '', author: '', price: '', shipping_weight: '', 'isbn-10': ''};

    // parse title, author
    $('#btAsinTitle').filter(function(){
      let data = $(this);
      title = data.ignore('span').html();
      author = '';

      data.closest('.buying').find('span').find('a').each(function(i, el){
        if (author) { author += ', ' + el.children[0].data; }
        else { author = el.children[0].data; }
      });

      json.title = title;
      json.author = author;
    });

    $('#actualPriceValue').filter(function(){
      let data = $(this);

      price = data.text() + ' USD';
      json.price = price;
    });

    // json.shipping_weight = $('.content').find('ul').find('li:nth-child(7)').text();

    console.log('json:', json);
    bookData.push(json);
  });
});

function createList(){
  var list = [];
  for (var i = 1; i <= 20; i++){
    list.push(`book${i}.html`);
  }
  return list;
}


