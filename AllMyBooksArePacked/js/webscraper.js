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