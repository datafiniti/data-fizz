var App = (function App(){
  var publicAPI,
    $booksDisplay,
    $bookButton,
    $numBoxes
    books;

  publicAPI = {
    init: init
  };

  return publicAPI;

  function init() {
    $booksDisplay = $("#books");
    $bookButton = $("#getBooks");
    $packButton = $("#packButton");
    $numBoxes = $("#numBoxes");
    $boxesDiv = $("#boxesDiv");

    $bookButton.on('click', fetchBooks);
    $packButton.on('click', packBoxes);
  }


  function fetchBooks(){
    $.ajax('/getBooks', {
      method: 'GET',
      cache: false,
      success: function onSuccess(resp){
        books = resp;
        resp.forEach(function(book){
          $booksDisplay.append('<pre>' + JSON.stringify(book, null, 4) + '</pre>');
        })
      },
      error: function onError(jq,statusText,errText){
        console.error(jq, statusText, errText);
      },
    });
  }


  function packBoxes(e){
    e.preventDefault();
    $boxesDiv.empty();

    var packingBoxes = {},
        numBoxes = $('#numBoxes').val(),
        notEnoughBoxes = false;

    //setup the box objects
    for(var i = 1; i <= numBoxes; i++){
      packingBoxes['box' + i] = ({"id": i, "totalWeight": 0, "contents": []});
    }

    //Step 1, sort books by decreasing weight
    //Also note, the Number() with .substr business is because the weight is still in form '1.1 pounds' (string)
    books.sort(function(a, b){
      return Number(b.shipping_weight.substr(0, 3)) - Number(a.shipping_weight.substr(0, 3));
    });

    //Step 2, pack boxes by putting a book in the box which will leave the least
    //room leftover out of all the boxes
    books.forEach(function(book){
      var boxToPlaceIn = {'weight': 0, 'boxID': 0}, //holder variable
          canFit = false; //boolean to determine if the current book will fit in any box

      //find out which box to place the current book in
      for(var x in packingBoxes){
        //add the current book's weight to each of the boxes total weight
        var potentialWeight = packingBoxes[x]['totalWeight'] + Number(book.shipping_weight.substr(0, 3));
        if(potentialWeight <= 10 && potentialWeight > boxToPlaceIn['weight']){
          boxToPlaceIn = {'weight': potentialWeight, 'boxID': packingBoxes[x]['id']};
          canFit = true;
        }
      }

      if(!canFit){
        //set boolean which will display error message if the current book won't fix in any of the boxes
        notEnoughBoxes = true;
      } else {
        packingBoxes['box' + boxToPlaceIn['boxID']]['contents'].push(book);
        packingBoxes['box' + boxToPlaceIn['boxID']]['totalWeight'] += Number(book.shipping_weight.substr(0, 3));
      }

    });

    if(notEnoughBoxes){
      $boxesDiv.append('<p>Not enough Boxes!</p>');
    }

    //change total weights back to strings
    for(var z in packingBoxes){
      packingBoxes[z]['totalWeight'] = packingBoxes[z]['totalWeight'].toFixed(1).toString() + ' pounds';
    }

    $boxesDiv.append('<pre>' + JSON.stringify(packingBoxes, null, 4) + '</pre>');

  } //end packing function

})();


$(document).ready(App.init);
