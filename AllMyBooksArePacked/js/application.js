$(document).ready(function(){
  var warehouse = new Warehouse();
  for (var i = 1; i < 21; i++){
    var fileName = "../data/book" + i + ".html";
    webscraper = new Webscraper(fileName);
    webscraper.scrapeAndCreateBook(warehouse);
  }
  $(document).ajaxStop(function(){
    warehouse.packBoxes();
  })
})

// create a new webscraper object for each file inside of data