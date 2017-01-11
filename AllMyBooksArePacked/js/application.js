$(document).ready(function(){
  $('button').click(function(event){
    $.get('./data/book10.html', function(data){
      console.log(data)
    })
  })
})