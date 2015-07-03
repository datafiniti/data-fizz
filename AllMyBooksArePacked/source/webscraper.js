function Webscraper(url){
  this.url = url;
}

Webscraper.prototype.scrape = function(){
  console.log("hello")
}


// needs to scrape certain attributes
// controllers job to create the book objects with the information webscraper returns