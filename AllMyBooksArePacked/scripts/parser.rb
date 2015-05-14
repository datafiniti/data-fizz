require 'rubygems'
require 'nokogiri'         

book_numbers = Array(1..20)

book_numbers.each do |n|
  path = "../data/book" + n.to_s + ".html"
  
  page = Nokogiri::HTML(open(path))

  title = page.css("span[id=btAsinTitle]").text
  author = page.css("div[class=buying] a")[2].text
  price = page.css("span[id=actualPriceValue]").text
  weight = page.css("div[id=detail-bullets]").css('li')[6].text
  isbn = page.css("div[id=detail-bullets]").css('li')[3].text
  
  puts n
  puts title #TODO take of hardcover text if possible
  puts author
  puts weight #TODO has extra text
  puts isbn #TODO has extra text
  puts " "
end


