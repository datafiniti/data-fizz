require 'rubygems'
require 'nokogiri'
require 'pry'         

# def scrape
  product_count = Array(1..20)

  product_data = [] #Array of arrays

  product_count.each do |n|
      path = "../data/book" + n.to_s + ".html"
  
      page = Nokogiri::HTML(open(path))
    
      rawTitle = page.css("span[id=btAsinTitle]").text #TODO agnosticize #OK
      title = rawTitle.slice(0...(rawTitle.index(' [')))
    
      author = page.css("div[class=buying] a")[2].text #consider changing this as well
    
      price = page.css("span[id=actualPriceValue]").text
    
      rawWeight = ""
      rawIsbn = ""
      page.css("div[id=detail-bullets]").css('li').each do |list_item|
        if list_item.text.include?("Shipping Weight")
          rawWeight = list_item.text
        elsif list_item.text.include?("ISBN-10")
          rawIsbn = list_item.text
        end
      end
    
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
  end
        
# end


# def box

  json = [] # Array of hashes { {box: {box_info}}, {box: {box_info}}, ...}

  box_no = 1 #iterator
  
  loop do
    box_info = {
                "id": box_no,
                "totalWeight": 0,
                "contents": Array.new #Array of Hashes, each hash is info about a specific product
                }

    product_data.each do |product|
      if product[0][:weight] + box_info[:totalWeight] <= 10
        box_info[:totalWeight] += product[0][:weight]
        box_info[:contents] << product[1] #product info hash (excludes weight measurement)
        product_data.delete_at(product_data.index(product))
      end
    end

    json << {box: box_info}
    
    box_no += 1

    if product_data.length < 1
      break
    end
  end

# end


