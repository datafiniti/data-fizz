$(document).ready(function(){
  
  const bookData = [];
  const boxContainer = [];
  const bookURLs = ['./data/book1.html','./data/book2.html','./data/book3.html','./data/book4.html',
  './data/book5.html','./data/book6.html','./data/book7.html','./data/book8.html','./data/book9.html',
  './data/book10.html','./data/book11.html','./data/book12.html','./data/book13.html','./data/book14.html',
  './data/book15.html','./data/book16.html','./data/book17.html','./data/book18.html','./data/book19.html',
  './data/book20.html'];
  var boxCounter = 0;

  var Box = function(id, maxWeight) {
    var box = {}
    box.id = id;
    box.maxWeight = maxWeight;
    box.contents = [];
    box.totalWeight = 0;

    box.addBook = function(book){
      box.contents.push(book);
      box.totalWeight += book.shippingWeight
    }

    return box
  }

  boxContainer.push(Box(0,10))
  var currentBox = boxContainer[boxCounter]

  //Split this into 2 functions to make more functional
  function getBook(url){
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
  };

  var requests = bookURLs.map((url) => {
    return new Promise((resolve, reject) => {
      resolve(getBook(url))
    })
  })

  $('button').click(function(event){
    Promise.all(requests).then(function(){
      bookData.sort(function(a,b){
        return b.shippingWeight - a.shippingWeight
      })
      bookData.forEach(function(book){
        if (book.shippingWeight <= currentBox.maxWeight - currentBox.totalWeight) {
          currentBox.addBook(book)
        } else {
        boxCounter ++;
        boxContainer.push(new Box(boxCounter, 10))
        console.log(currentBox)
        currentBox.addBook(book)
        }
      })
      console.log(boxContainer)
    })
  })
})