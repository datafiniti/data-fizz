# William Hudgins
# Datafiniti Coding Challenge
# Extractor.rb
# 07/01/15
#
# Contains an extractor tool used to scrape and extract data from Amazon
#  book pages. Requires the Book and nokogiri classes.

require 'nokogiri'
require_relative 'Book'

## Extractor to scrape and extract data from Amazon book pages.
# Requires Book class found in Book.rb
class Extractor 
  ##Constructor for Exractor class
  #+dir+ - directory containing the files to extract data from
  def initialize(dir)
    @dir = dir; # Directory containing book pages
  end

  ## Extracts book information and returns an array of books
  # +Book+ - Array containing information about each book
  def extract_book_info
    book = Array.new; # Array to hold all books

    # While there are files to read, read and ioperate on those files
    Dir.foreach(@dir) do |current_file|
      next if current_file == '.' or current_file == '..'
        doc = Nokogiri::HTML(open(@dir + "/" + current_file))        
        
        # Extract title and author from meta data
        # Note: This method includes foreward and introduction writers as authors
        extract = doc.at_xpath("//meta[@name='description']/@content").content
        extract = extract.split("[")
        title = extract[0].rstrip # -2 to remove trailing space    
        author = extract[1].split("]")[0]
    
        # Extract the price
        # Books with rentals have prices listed differently
        rent_price = doc.at_xpath("//span[contains(@class, 'rentPrice')]")
        normal_price = doc.at_xpath("//span[contains(@class, 'bb_price')]")
        price = rent_price.nil? ? normal_price.content : rent_price.content
        price = price.split("$")[1].rstrip
        price = price.delete(",")
        price = price.to_f

        # Extract shipping wieght
        extract = doc.at_xpath("//table[@id='productDetailsTable']//tr").content
        extract = extract.split("Shipping Weight")[1].split("pounds")[0]
        extract = extract.split(":")[1]
        shipping_weight = extract[1..-1].to_f

        # Extract ISBN-10
        extract = doc.at_xpath("//link[@rel='canonical']/@href").content
        isbn10 = extract.split("/")[-1] 
        book.push(Book.new(title, author, price, shipping_weight, isbn10));
      end 
    return book;
  end
end
