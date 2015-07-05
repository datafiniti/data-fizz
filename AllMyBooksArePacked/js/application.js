$(document).ready(function(){
  var warehouse = new Warehouse();
  var webscraper = new Webscraper();
  for (var i = 1; i < 21; i++){
    var fileName = "../data/book" + i + ".html";
    $.ajax({
      url: fileName,
      type: 'get',
      dataType: 'html'
    }).done(function(response){

      var price = webscraper.scrapePrice(response);
      price = webscraper.cleanPrice(price);

      var title = webscraper.scrapeTitle(response);
      title = webscraper.cleanTitle(title);

      var author = webscraper.scrapeAuthor(response);

      var shippingWeight = webscraper.scrapeShippingWeight(response);
      shippingWeight = webscraper.cleanShippingWeight(shippingWeight);

      var isbn10 = webscraper.scrapeIsbn10(response);

      warehouse.contents.push(new Book(title, author, price, shippingWeight, isbn10));
    })
  }
  $(document).ajaxStop(function(){
    warehouse.packBoxes();
    var obj = JSON.stringify(warehouse.packedBoxes);
    $("body").append(obj);
  })
})

