function Webscraper(){
}

Webscraper.prototype.preparePrice = function(data){
  var price = this.scrapePrice(data);
  var formattedPrice = this.cleanPrice(price);
  return formattedPrice;
}

Webscraper.prototype.scrapePrice = function(data){
  return $(data).find(".bb_price").text();
}

Webscraper.prototype.cleanPrice = function(priceString){
  return Number(priceString.slice(2).trim());
}


Webscraper.prototype.prepareTitle = function(data){
  var title = this.scrapeTitle(data);
  var formattedTitle = this.cleanTitle(title);
  return formattedTitle;
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

Webscraper.prototype.prepareAuthor = function(data){
  var author = this.scrapeAuthor(data);
  return author;
}

Webscraper.prototype.scrapeAuthor = function(data){
  return $(data).find(".byLinePipe").prev("a").text();
}

Webscraper.prototype.prepareShippingWeight = function(data){
  var shippingWeight = this.scrapeShippingWeight(data);
  var formattedShippingWeight = this.cleanShippingWeight(shippingWeight);
  return formattedShippingWeight;
}

Webscraper.prototype.scrapeShippingWeight = function(data){
  return $(data).find("li").filter(":contains(Shipping Weight)").text();

}

Webscraper.prototype.cleanShippingWeight = function(shippingWeightString){
  return Number(shippingWeightString.slice(17, -42));
}

Webscraper.prototype.prepareIsbn10 = function(data){
  var isbn10 = this.scrapeIsbn10(data);
  var formattedIsbn10 = this.cleanIsbn10(isbn10);
  return formattedIsbn10;
}

Webscraper.prototype.scrapeIsbn10 = function(data){
  return $(data).find("li").filter(":contains(ISBN-10)").text();
}

Webscraper.prototype.cleanIsbn10 = function(isbn10String){
  return isbn10String.slice(9);
}