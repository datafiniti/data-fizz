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

      var price = webscraper.scrapePrice();
      var price = webscraper.cleanPrice(price);

      var title = $(response).find("#btAsinTitle").text();
      var endOfSlice;
      for (var i = 0; i < title.length; i++){
        if (title[i]==="["){
          endOfSlice = i;
        }
      }
      title = title.slice(0, endOfSlice).trim();

      var author = $(response).find(".byLinePipe").prev("a").text();

      var shippingWeight = $(response).find("li").filter(":contains(Shipping Weight)").text();
      shippingWeight = Number(shippingWeight.slice(17, -42));

      var isbn10 = $(response).find("li").filter(":contains(ISBN-10)").text();
      isbn10 = isbn10.slice(9);

      warehouse.contents.push(new Book(title, author, price, shippingWeight, isbn10));
    })
  }
  $(document).ajaxStop(function(){
    warehouse.packBoxes();
    var obj = JSON.stringify(warehouse.packedBoxes);
    $("body").append(obj);
  })
})

