const cheerio = require('cheerio');
const fs      = require('fs');

let bookList = createList();
let bookData = {};

bookList.forEach(function(book){
  fs.readFile(`../data/${book}`, 'utf8', (err, html) => {
    if (err) { console.error(err); }
    const $ = cheerio.load(html);

    // Allows $ to ignore text within nested selectors
    $.fn.ignore = function(sel){
      return this.clone().find(sel||">*").remove().end();
    };

    let title, author, price, shipping_weight, isbn10;
    let json = {title: '', author: '', price: '', shipping_weight: '', 'isbn-10': ''};

    $('#btAsinTitle').filter(function(){
      let data = $(this);
      // console.log("data:", data.text());
      title = data.ignore('span').html();
      console.log("title:", title);

    });
    // json.author = $('.buying').find('span').find('a').html();
    // json.price = $('#actualPriceValue').text() + ' USD';
    // json.shipping_weight = $('.content').find('ul').find('li:nth-child(7)').text();

    // console.log('json:', json);
  });
});

function createList(){
  var list = [];
  for (var i = 1; i <= 20; i++){
    list.push(`book${i}.html`);
  }
  return list;
}
