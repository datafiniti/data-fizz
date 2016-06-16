var App = (function App(){
  var publicAPI,
    $booksDisplay,
    $bookButton;

  publicAPI = {
    init: init
  };

  return publicAPI;

  function init() {
    $booksDisplay = $("#books");
    $bookButton = $("#getBooks");

    $bookButton.on('click', fetchBooks);
  }

  // function showMessage(msg) {
  //   $message.removeClass("error").html(msg).show();
  // }

  function fetchBooks(){
    console.log('clicked');
    $.ajax('/getBooks', {
      method: 'GET',
      cache: false,
      success: function onSuccess(resp){
        console.log('success', resp);
        resp.forEach(function(book){
          $booksDisplay.append('<p>' + JSON.stringify(book) + '</p>');
        })
      },
      error: function onError(jq,statusText,errText){
        console.error(jq, statusText, errText);
      },
    });
  }

})();

console.log('jquery', $);
$(document).ready(App.init);
