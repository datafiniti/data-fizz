function Webscraper(url){
  this.url = url;
}

Webscraper.prototype.scrape = function(){
  $.ajax({
      url: this.url,
      type: 'get',
      dataType: 'html'
    }).done(function(response){
     console.log(response);
    })
}


// needs to scrape certain attributes
// controllers job to create the book objects with the information webscraper returns