require 'json'
require_relative 'crawler'
require_relative 'book'
require_relative 'boxes'

class Boxer < Book  
	include Boxes
	attr_reader :shipping_weights  
	
	def parse_weight_num(weight)
		grab = weight.match(/\d+.\d+/)
		weights = (grab.to_s).to_f
	end
	
	def book_boxer(books)	
		package = Array.new
		box = Box.new
		box.weight= 0.0
		box.id= 0
		books = books.sort_by{|book| book.shipping_weight}
		books.each do |pack|
			box.books << pack 
			box.weight += parse_weight_num(pack.shipping_weight) 	
			if box.weight > 10.0
				last_pack = box.books.delete(pack)
					box.weight -= parse_weight_num(pack.shipping_weight)
					box.id += 1	
					package << box
					box = Box.new
				  box.weight= 0.0
					box.id = package.count + 1
					box.books << last_pack
			end
		end
		return package 
	end
end
