require 'pry'
require_relative 'product'
require_relative 'box'

# Class: Scrape
#
# Creates scrape Object with attributes from a respective HTML file.
#
# Attributes:
# + @title     - String: Title info from file.
# + @author    - String: Author info from file.
# + @price     - String: Price info from file.
# + @weight    - Float: Weight info from file; converted to Float for later mathematical comparisons.
# + @isbn      - String: ISBN-10 info from file.
#
# Public Methods:
# + build_product

class Scrape
  
  def initialize(file_number)
    path = "./data/book" + file_number.to_s + ".html"

    page = Nokogiri::HTML(open(path)) #Nokogiri Object
    
    # Lines 28-46 can/should be refactored and written more agnostically. Eventually could become methods that take the CSS arguments specific to different sites.
  
      rawTitle = page.css("span[id=btAsinTitle]").text 
      @title = rawTitle.slice(0...(rawTitle.index(' [')))
  
      @author = page.css("div[class=buying] a")[2].text # Consider rewriting if possible
  
      @price = page.css("span[id=actualPriceValue]").text
      
      rawWeight = ""
      rawIsbn = ""
      page.css("div[id=detail-bullets]").css('li').each do |list_item|
        if list_item.text.include?("Shipping Weight")
          rawWeight = list_item.text
        elsif list_item.text.include?("ISBN-10")
          rawIsbn = list_item.text
        end # conditionals
      end # .each do loop
      
      @weight = rawWeight.slice((rawWeight.index(":")+2)...(rawWeight.index(" pounds"))).to_f
      @isbn = rawIsbn.split(": ")[1]
  
  end # method
  
  # Public: #build_product
  # Creates Product object with information scraped from respective file, returns formatted representation of the Product.
  #
  # Parameters:
  # None.
  #
  # Returns:
  # Array: Array containing two Hashes, one with weight and one with formatted product info.
  #
  # State Changes:
  # Creates new Product instance.
    
  def build_product
    product = Product.new({weight: @weight,
              title: @title,
              author: @author,
              price: @price,
              isbn: @isbn
              })
              
    product.format_info
  end # method

end # class
