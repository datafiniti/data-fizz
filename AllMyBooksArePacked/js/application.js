$(document).ready(function(){
  $('button').click(function(event){
    $.post('/scrapeToday', { url: './data/book10.html'})
  })
})