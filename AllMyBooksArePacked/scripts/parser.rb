require 'rubygems'
require 'nokogiri'
require 'pry'         

# def scrape
product_count = Array(1..20)

product_data = [] #Array of arrays

product_count.each do |n|
  # unless n == 6 || n == 12 || n == 20 #TODO figure out while scraping breaks for these entries; look into issues with scaling.
    path = "../data/book" + n.to_s + ".html"
  
    page = Nokogiri::HTML(open(path))
    
    rawTitle = page.css("span[id=btAsinTitle]").text #TODO agnosticize 
    
    author = page.css("div[class=buying] a")[2].text
    
    price = page.css("span[id=actualPriceValue]").text
    
    rawWeight = page.css("div[id=detail-bullets]").css('li')[6].text
    
    rawIsbn = page.css("div[id=detail-bullets]").css('li')[3].text
    
    binding.pry
    
    title = rawTitle.slice(0...(rawTitle.index(' [')))
    weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
    isbn = rawIsbn.split(": ")[1]
    
    
    info = [{weight: weight}, 
            { "title": title, 
            "author": author, 
            "price": price + " USD", 
            "shipping_weight": weight.to_s + " pounds", 
            "isbn-10": isbn
            }]
                
    product_data << info #Array << Array
  # end
end
        
# end


# def box

# json = {} # Hash of :box => {} k,v pairs
# boxed_products = [] #Utility variable for tracking which items have been boxed.
#
# box_no = 1 #iterator
#
# loop do
#   box_info = {
#               "id": box_no,
#               "totalWeight": 0,
#               "contents": Array.new #Array of Hashes, each hash is info about a specific product
#               }
#
#   l = product_data.length - 1
#   for product_index in 0..l #iterator
#     product = product_data[product_index]
#     if product[0][:weight] + box_info[:totalWeight] <= 10 && !boxed_products.include?(product)
#       box_info[:totalWeight] += product[0][:weight]
#       box_info[:contents] << product[1] #product info hash (excludes weight measurement)
#       boxed_products << product
#       product_index += 1
#     else
#       product_index += 1
#     end
#   end
#
#   json[:box] = box_info #TODO problem here with how we are setting up the hash
#   json[:box][:totalWeight] = json[:box][:totalWeight].to_s + " pounds"
#
#   binding.pry
#
#   box_no += 1
#
#   if product_data.length == boxed_products.length
#     break
#   end
# end
#
# puts json
#
# # end
#
#
