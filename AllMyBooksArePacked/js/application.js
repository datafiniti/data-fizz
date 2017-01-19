$(document).ready(function(){
  
  //Will hold all our books after fetching/scarping them them
  const bookStorage = [];
  
  //The URLs that contain the info we wish to scrape
  const bookURLs = ['./data/book1.html','./data/book2.html','./data/book3.html','./data/book4.html',
  './data/book5.html','./data/book6.html','./data/book7.html','./data/book8.html','./data/book9.html',
  './data/book10.html','./data/book11.html','./data/book12.html','./data/book13.html','./data/book14.html',
  './data/book15.html','./data/book16.html','./data/book17.html','./data/book18.html','./data/book19.html',
  './data/book20.html'];

  //The Box class, which contains an array of all the books it contains, it's total weight, and a method 
  //for adding books to it
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

  //Retrieves data from the given URL, and pushes it to the array of your choosing
  function getBook(url, storage){
    $.get(url, function(response){
      var parsedResponse = $($.parseHTML(response));
      var bookObj = {}

      bookObj.ISBN = parsedResponse.find('td.bucket .content ul li').eq(3).text().split(':')[1].trim()
      
      //Sometimes the product details are missing a field or have an extra field, so we have to account for those edge cases
      bookObj.shippingWeight = Number(parsedResponse.find('td.bucket .content ul li').eq(6).text().split(' ')[2].trim()) || Number(parsedResponse.find('td.bucket .content ul li').eq(7).text().split(' ')[2].trim()) || Number(parsedResponse.find('td.bucket .content ul li').eq(5).text().split(' ')[2].trim()) 
      bookObj.title = parsedResponse.find('span#btAsinTitle').text().split('[')[0].trim()
      bookObj.author = parsedResponse.find('.buying span a').eq(0).text()
      bookObj.price = parsedResponse.find('.priceLarge').text()
      
      storage.push(bookObj)
    });
  };

  function sortBooks(bookStorage){
    //Our final JSON output
    const output = {}

    //Will hold our boxes
    const boxStorage = []

    //Number of current boxes
    let boxCounter = 0;

    //Start out our boxContainer with one Box
    boxStorage.push(Box(0,10))
    var currentBox = boxStorage[boxCounter]

    //Sort our books from smallest to largest
    bookStorage.sort(function(a,b){
        return a.shippingWeight - b.shippingWeight
      })
    
    //Using linear time complexity here by only checking the most recently-created box to see if
    //the current book will fit. Saves on time complexity, but sacrifices space efficiency
    bookStorage.forEach(function(book){
      if (book.shippingWeight <= currentBox.maxWeight - currentBox.totalWeight) {
          currentBox.addBook(book)
      } else {
        boxCounter ++;
        boxStorage.push(new Box(boxCounter, 10))
        currentBox = boxStorage[boxCounter]
        currentBox.addBook(book)
      }
    })
    
    //Create a JSON object out of our boxStorage array
    boxStorage.forEach(function(box){
      output['box' + box.id] = JSON.stringify(box)
    })
    console.log(output)
  }

  //Map our bookURLs into an array of promises that when resolved will call getBook on each of them
  //This is necessary so that we can call Promise.all later in order to ensure that all the book data
  //has been retrieved before performing any operations
  var requests = bookURLs.map((url) => {
    return new Promise((resolve, reject) => {
      resolve(getBook(url, bookStorage))
    })
  })

  $('button').click(function(event){
    Promise.all(requests).then(sortBooks(bookStorage))
  })
})