require 'rubygems'
require 'nokogiri'         

page = Nokogiri::HTML(open("../data/book2.html"))

title = page.css("span[id=btAsinTitle]").text
author = page.css("div[class=buying]").css('a')[2].text
price = page.css("span[id=actualPriceValue]").text
weight = page.css("div[id=detail-bullets]").css('li')[6].text
isbn = page.css("div[id=detail-bullets]").css('li')[3].text

puts title #TODO take of hardcover text if possible
puts author
puts price
puts weight #TODO has extra text
puts isbn #TODO has extra text
