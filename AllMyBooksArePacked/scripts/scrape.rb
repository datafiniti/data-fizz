require 'pry'
require_relative 'product'
require_relative 'box'

# Class: Name
#
# Description.
#
# Attributes:
# + @name    - Class: description.
#
# Public Methods:
# + method_name

class Scrape
  
  def initialize(file_number)
    path = "./data/book" + file_number.to_s + ".html"

    page = Nokogiri::HTML(open(path))
  
    rawTitle = page.css("span[id=btAsinTitle]").text #TODO agnosticize #OK
    @title = rawTitle.slice(0...(rawTitle.index(' [')))
  
    @author = page.css("div[class=buying] a")[2].text #consider changing this as well
  
    @price = page.css("span[id=actualPriceValue]").text
    
    #### factor into method ####
  
    rawWeight = ""
    rawIsbn = ""
    page.css("div[id=detail-bullets]").css('li').each do |list_item|
      if list_item.text.include?("Shipping Weight")
        rawWeight = list_item.text
      elsif list_item.text.include?("ISBN-10")
        rawIsbn = list_item.text
      end
    end
    
    #############################
  
    @weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
    @isbn = rawIsbn.split(": ")[1]
  end
    
  def build_product
    product = Product.new({weight: @weight,
              title: @title,
              author: @author,
              price: @price,
              isbn: @isbn
              })
              
    product.format_info
  end

end
