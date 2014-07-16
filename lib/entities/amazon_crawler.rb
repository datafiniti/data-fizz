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
  	  matched = @page.css('title').text.match(/(.\W)\d+(: Amazon.com: Books)$/)
      return nil if !matched
      matched = matched.pre_match.match(/([^:]+)$/).pre_match
      matched.slice!(-1)
      matched
    end

    def parse_book_author
      matched = @page.css('title').text.match(/(.\W)\d+(: Amazon.com: Books)$/)
      return nil if !matched
  	  matched = matched.pre_match.match(/([^:]+)$/).to_s
      matched.slice!(0)
      matched
  	end

  	def parse_book_price
  	  matched = @page.css('table.product b').text.match(/\A[$]\d+[.]\d+/)
  	  matched ? matched.to_s + " USD" : nil
  	end

  	def parse_book_isbn
  	  matched = @page.css('table#productDetailsTable div li[4]').text.match(/\s\d+/)
  	  matched ? matched.to_s.delete(" ") : nil
  	end

  	def parse_book_weight
  	  weight = @page.css('table#productDetailsTable div li[7]').text.match(/\d+[.]\d+\s\w+/)
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