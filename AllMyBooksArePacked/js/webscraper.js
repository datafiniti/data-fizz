function Webscraper(){
}

Webscraper.prototype.scrapePrice = function(data){
  return $(data).find(".bb_price").text();
}

Webscraper.prototype.cleanPrice = function(priceString){
  return Number(priceString.slice(2).trim());
}

Webscraper.prototype.scrapeTitle = function(data){
  return $(data).find("#btAsinTitle").text();
}

Webscraper.prototype.cleanTitle = function(titleString){
  var endOfSlice;
      for (var i = 0; i < titleString.length; i++){
        if (titleString[i]==="["){
          endOfSlice = i;
        }
      }
  return titleString.slice(0, endOfSlice).trim();
}

Webscraper.prototype.scrapeAuthor = function(data){
  return $(data).find(".byLinePipe").prev("a").text();
}

Webscraper.prototype.scrapeShippingWeight = function(data){
  return $(data).find("li").filter(":contains(Shipping Weight)").text();

}

Webscraper.prototype.cleanShippingWeight = function(shippingWeightString){
  return Number(shippingWeightString.slice(17, -42));
}