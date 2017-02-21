require 'nokogiri'
require 'open-uri'
require_relative 'GrabPage'
require 'pry-debugger'

class Crawler < GrabAmazonPage 
	attr_reader :params
	def initialize(list) 
		@list = [list]	
		@page_list = Array.new
		list_iterator	
	end
	
	def searcher(arg)
		@page_list.map{|grab| grab.css(arg)}
	end

	def parse_title
		titles = searcher('#btAsinTitle').map!{ |grab| grab.text}
		titles[0]
	end
	
	def parse_author 
		authors = searcher('meta')
		authors = authors[0][1].attributes["content"].value	
		authors = authors.match(/\[{1}.+\]/).to_s
		authors.delete "'['']'"
	end
	
	def parse_price
		prices = searcher('.priceLarge').map!{ |grab| grab.text}
		prices[0]
	end

	def parse_shipping_weight
		weight = searcher('b')
		weight.map!{ |grab| grab.detect {
			|element| element.text ==  'Shipping Weight:'}.parent.text
		}
		weight = weight.map!{ |grab| grab.match(/\d+\.{1}\d+\s\w+/)}
		weight[0].to_s 
	end

	def parse_isbn
		isbns = searcher('b')
		isbns.map!{ |grab| grab.detect {
			|element| element.text == "ISBN-10:"}.parent.children[1].text
		}
		isbns[0]
	end

	def book_attr
		@params = {} 
		@params[:title] = self.parse_title
		@params[:author] = self.parse_author
		@params[:price] = self.parse_price
		@params[:isbn] = self.parse_isbn
		@params[:shipping_weight] = self.parse_shipping_weight
		return @params
	end
end
