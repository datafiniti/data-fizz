require 'rubygems'
require 'nokogiri'
require 'json'
require 'pry'  

require_relative './scripts/scrape.rb'
require_relative './scripts/product.rb'
require_relative './scripts/box.rb'

################################# 

f = Dir.glob('**/*.html').count

product_count = Array(1..f)

product_data = []

product_count.each do |n|
  scraped_info = Scrape.new(n)
  product_data << scraped_info.build_product
end

boxes = [] # Array of hashes { {box: {box_info}}, {box: {box_info}}, ...}

box_no = 1 #iterator

loop do

  box = Box.new(box_no)
  box_info = box.format_info

  product_data.each do |product|
    if product[0][:weight] + box_info[:totalWeight] <= 10
      box_info[:totalWeight] += product[0][:weight]
      box_info[:contents] << product[1] #product info hash (excludes weight measurement)
      product_data.delete_at(product_data.index(product))
    end
  end

  boxes << {box: box_info}

  box_no += 1

  if product_data.length < 1
    break
  end
end

boxes_json = JSON.pretty_generate(boxes)

json_doc = File.new("boxed_products.json", "w")
json_doc.puts(boxes_json)
json_doc.close


#################################       

# def scrape
  # product_count = Array(1..20)
  #
  # product_data = [] #Array of arrays
  #
  # product_count.each do |n|
  #   #primitive scrape
  #     path = "../data/book" + n.to_s + ".html"
  #
  #     page = Nokogiri::HTML(open(path))
  #
  #     rawTitle = page.css("span[id=btAsinTitle]").text #TODO agnosticize #OK
  #     title = rawTitle.slice(0...(rawTitle.index(' [')))
  #
  #     author = page.css("div[class=buying] a")[2].text #consider changing this as well
  #
  #     price = page.css("span[id=actualPriceValue]").text
  #
  #     rawWeight = ""
  #     rawIsbn = ""
  #     page.css("div[id=detail-bullets]").css('li').each do |list_item|
  #       if list_item.text.include?("Shipping Weight")
  #         rawWeight = list_item.text
  #       elsif list_item.text.include?("ISBN-10")
  #         rawIsbn = list_item.text
  #       end
  #     end
  #
  #     weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
  #     isbn = rawIsbn.split(": ")[1]
  #
  #     #primitive product
  #     info = [{weight: weight},
  #             { "title": title,
  #             "author": author,
  #             "price": price + " USD",
  #             "shipping_weight": weight.to_s + " pounds",
  #             "isbn-10": isbn
  #             }]
  #
  #     product_data << info #Array << Array
  # end
        
# end


# def box



# end


