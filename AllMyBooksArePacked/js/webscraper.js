function Webscraper(){
}

Webscraper.prototype.scrapePrice = function(data){
  return $(data).find(".bb_price").text();
}

Webscraper.prototype.cleanPrice = function(priceString){
  return Number(priceString.slice(2).trim());
}