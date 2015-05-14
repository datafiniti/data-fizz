require 'rubygems'
require 'nokogiri'         

# def scrape
product_count = Array(1..20)

product_data = [] #Array of arrays

product_count.each do |n|
  unless n == 6 || n == 12 || n == 20 #TODO figure out while scraping breaks for these entries; look into issues with scaling.
    path = "../data/book" + n.to_s + ".html"
  
    page = Nokogiri::HTML(open(path))
    
    rawTitle = page.css("span[id=btAsinTitle]").text #TODO agnosticize 
    title = rawTitle.slice(0...(rawTitle.index(' [')))
    
    author = page.css("div[class=buying] a")[2].text
    
    price = page.css("span[id=actualPriceValue]").text
    
    rawWeight = page.css("div[id=detail-bullets]").css('li')[6].text
    weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
    
    rawIsbn = page.css("div[id=detail-bullets]").css('li')[3].text
    isbn = rawIsbn.split(": ")[1]
  
    # puts title
    # puts author
    # puts price
    # puts weight
    # puts isbn
    # puts " "
    
    info = [{weight: weight}, 
            { "title": title, 
            "author": author, 
            "price": price + " USD", 
            "shipping_weight": weight.to_s + " pounds", 
            "isbn-10": isbn
            }]
                
    product_data << info
  end
end

# puts product_data[0]
# end


# def box

json = { 
        "box": {
          "id": 1, 
          "totalWeight": 0, 
          "contents": Array.new
          }
        }
        
l = product_data.length - 1
puts l 
for i in 0..l
  product = product_data[i]
  if product[0][:weight] + json[:box][:totalWeight] <= 10
    json[:box][:totalWeight] += product[0][:weight]
    json[:box][:contents] << product[1]
    i += 1
  else
    i += 1
  end
end

json[:box][:totalWeight] = json[:box][:totalWeight].to_s + " pounds"

puts json

# end


