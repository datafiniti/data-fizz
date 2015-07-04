$(document).ready(function(){
  webscraper = new Webscraper("../data/book1.html");
  webscraper.scrape();
})

// create a new webscraper object for each file inside of data