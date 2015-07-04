$(document).ready(function(){
  webscraper = new Webscraper("../data/book1.html");
  var warehouse = new Warehouse();
  webscraper.scrapeAndCreateBook(warehouse);
  console.log(warehouse);
})

// create a new webscraper object for each file inside of data