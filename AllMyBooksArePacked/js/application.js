$(document).ready(function(){
  
  const bookData = [];
  const bookURLs = ['./data/book1.html','./data/book2.html','./data/book3.html','./data/book4.html',
  './data/book5.html','./data/book6.html','./data/book7.html','./data/book8.html','./data/book9.html',
  './data/book10.html','./data/book11.html','./data/book12.html','./data/book13.html','./data/book14.html',
  './data/book15.html','./data/book16.html','./data/book17.html','./data/book18.html','./data/book19.html',
  './data/book20.html'];

  
  $('button').click(function(event){
    bookURLs.forEach(function(url){
      $.get(url, function(response){
        var parsedResponse = $($.parseHTML(response));
        var bookObj = {}

        bookObj.ISBN = parsedResponse.find('td.bucket .content ul li').eq(3).text().split(':')[1].trim()
        
        //Sometimes the product details are missing a field or have an extra field, so we have to account for those edge cases
        bookObj.shippingWeight = Number(parsedResponse.find('td.bucket .content ul li').eq(6).text().split(' ')[2].trim()) || Number(parsedResponse.find('td.bucket .content ul li').eq(7).text().split(' ')[2].trim()) || Number(parsedResponse.find('td.bucket .content ul li').eq(5).text().split(' ')[2].trim()) 
        bookObj.title = parsedResponse.find('span#btAsinTitle').text().split('[')[0].trim()
        bookObj.author = parsedResponse.find('.buying span a').eq(0).text()
        bookObj.price = parsedResponse.find('.priceLarge').text()
        
        bookData.push(bookObj)
      });
    });
    bookData.forEach(function(book){
      console.log(book.title)
    })
  });
})