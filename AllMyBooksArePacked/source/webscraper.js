function Webscraper(url){
  this.url = url;
}



Webscraper.prototype.scrapeAndCreateBook = function(warehouse){
  $.ajax({
      url: this.url,
      type: 'get',
      dataType: 'html'
    }).done(function(response){

      var price = $(response).find(".bb_price").text();
      price = Number(price.slice(2).trim());

      var title = $(response).find("#btAsinTitle").text();
      var endOfSlice;
      for (var i = 0; i < title.length; i++){
        if (title[i]==="["){
          endOfSlice = i;
        }
      }
      title = title.slice(0, endOfSlice).trim();
      
      console.log(title);
      var author = $(response).find(".byLinePipe").prev("a").text();
      var shippingWeight = $(response).find("li").filter(":contains(Shipping Weight)").text();
      var isbn10 = $(response).find("li").filter(":contains(ISBN-10)").text();
      warehouse.contents.push(new Book(title, author, price, shippingWeight, isbn10));
    })
}



// needs to scrape certain attributes
// controllers job to create the book objects with the information webscraper returns