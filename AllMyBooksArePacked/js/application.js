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

      var author = webscraper.prepareAuthor(response);

      var shippingWeight = webscraper.prepareShippingWeight(response);

      var isbn10 = webscraper.prepareIsbn10(response);

      warehouse.contents.push(new Book(title, author, price, shippingWeight, isbn10));
    })
  }
  $(document).ajaxStop(function(){
    warehouse.packBoxes();
    var obj = JSON.stringify(warehouse.packedBoxes);
    $("body").append(obj);
  })
})

