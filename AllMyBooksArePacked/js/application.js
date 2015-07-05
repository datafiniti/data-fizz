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

      var price = webscraper.preparePrice(response);

      var title = webscraper.prepareTitle(response);

      var author = webscraper.scrapeAuthor(response);

      var shippingWeight = webscraper.scrapeShippingWeight(response);
      shippingWeight = webscraper.cleanShippingWeight(shippingWeight);

      var isbn10 = webscraper.scrapeIsbn10(response);
      isbn10 = webscraper.cleanIsbn10(isbn10);


      warehouse.contents.push(new Book(title, author, price, shippingWeight, isbn10));
    })
  }
  $(document).ajaxStop(function(){
    warehouse.packBoxes();
    var obj = JSON.stringify(warehouse.packedBoxes);
    $("body").append(obj);
  })
})

