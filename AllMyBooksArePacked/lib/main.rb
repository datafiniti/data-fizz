require_relative 'boxer'
require_relative 'crawler'
require_relative 'GrabAmazonPage'
Dir["data/*.rb"].each {|file| require file }

class Main < Boxer
	attr_reader :box
	def initialize(pages)   
		books = []
		pages.each do |page|
		crawler = Crawler.new(page).book_attr
		book = Book.new(crawler) 
		books << book
		end
		@box = Boxer.new.book_boxer(books)
		binding.pry
	end
		@return @box
end

Main.new(pages).box
