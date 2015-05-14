require 'rubygems'
require 'nokogiri'         

book_numbers = Array(1..20)

book_numbers.each do |n|
  unless n == 6 || n == 12 || n == 20
    path = "../data/book" + n.to_s + ".html"
  
    page = Nokogiri::HTML(open(path))
    
    rawTitle = page.css("span[id=btAsinTitle]").text
    title = rawTitle.slice(0...(rawTitle.index('[')))
    
    author = page.css("div[class=buying] a")[2].text
    
    price = page.css("span[id=actualPriceValue]").text
    
    
    rawWeight = page.css("div[id=detail-bullets]").css('li')[6].text
    weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
    
    rawIsbn = page.css("div[id=detail-bullets]").css('li')[3].text
    isbn = rawIsbn.split(": ")[1]
  
    puts title
    puts author
    puts weight
    puts isbn 
    puts " "
  end
end


