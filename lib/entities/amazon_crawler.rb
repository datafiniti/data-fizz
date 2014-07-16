require 'nokogiri' 
require 'pry'

module DF
  class AmazonCrawler < WebCrawler
  	attr_reader :page
  	def initialize(source)
  	  super(source)
  	  @page = create_html_object
  	end

  	# Note: This could also be achieved by splitting the title_header into an array at colons, deleting the last 3 elements in the array and parsing through the remaining
  	def parse_book_title
  	  matched = @page.css('span#btAsinTitle').text
      matched.length > 1 ? matched : nil
    end

    def parse_book_author
      matched = @page.css('div.buying span a').children.to_a
      return nil if matched.length < 1
      matched.select!{|item| item.text != "Details"}
      result = matched.join(", ")
      # binding.pry
  	end

  	def parse_book_price
  	  matched = @page.css('div#rbb_bb_trigger span.bb_price').text
      return nil if !matched
  	  matched.to_s.slice!(0,1)
      matched.delete!(" ") + " USD"
  	end

  	def parse_book_isbn
  	  matched = @page.css('table#productDetailsTable div li:contains("ISBN-10")').text.match(/\s\d+/)
  	  matched ? matched.to_s.delete(" ") : nil
  	end

  	def parse_book_weight
  	  weight = @page.css('table#productDetailsTable div li:contains("Shipping Weight")').text.match(/\d+[.]\d+\s\w+/)
  	  return nil if !weight
      weight = weight.to_s
  	  if !weight.to_s.include?('pounds')
  	  	num = weight.match(/\d+[.]\d+/).to_s.to_f
  		num_in_pounds = num * 0.062500
  		weight = num_in_pounds.to_s + " pounds"
  	  end
  	  weight
  	end
  end
end