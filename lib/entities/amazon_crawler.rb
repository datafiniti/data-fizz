require 'nokogiri' 
require 'pry'

module DF
  class AmazonCrawler < WebCrawler
  	attr_reader :title, :author, :isbn, :weight, :price, :page
  	def initialize(source)
  	  super(source)
  	  @page = self.create_html_object
  	  @title = nil
  	  @author = nil
  	  @isbn = nil
  	  @weight = nil
  	  @price = nil
  	end

  	# Note: This could also be achieved by splitting the title_header into an array at colons, deleting the last 3 elements in the array and parsing through the remaining
  	def parse_title
  	  title_header = @page.css('title').text.match(/(.\W)\d+(: Amazon.com: Books)$/).pre_match
  	  matched = title_header.match(/\w+\s\w+\z/)
  	  @author = matched.to_s
  	  @title = matched.pre_match.slice(0..-3)
  	end

  	def parse_price
  	  @price = @page.css('table.product b').text.match(/\A[$]\d+[.]\d+/).to_s + " USD"
  	end

  	def parse_product_info
  	  @isbn = @page.css('table#productDetailsTable div li[4]').text.match(/\s\d+/).to_s.delete(" ")
  	  @weight = @page.css('table#productDetailsTable div li[7]').text.match(/\d+[.]\d+\s\w+/).to_s
  	  # binding.pry

  	  if !@weight.include?('pounds')
  	  	num = @weight.match(/\d+[.]\d+/).to_s.to_f
  		num_in_pounds = num * 0.062500
  		@weight = num_in_pounds.to_s + " pounds"
  	  end
  	end
  end
end