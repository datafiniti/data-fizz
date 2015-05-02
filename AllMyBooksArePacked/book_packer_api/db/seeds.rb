require_relative '../app/class_helpers/web_scrapinizor'
require_relative '../app/class_helpers/book_parser'
require_relative '../app/class_helpers/create_object'


files_to_scrape = Dir.entries("./../data").select{|file| file.include?("html")}.map{|file| "./../data/#{file}"}

files_to_scrape.each do |file|

  scraped_file = Scrape::AmazonBook.new(file).nokogiri_scrape

  book_info = Parser::AmazonBookParser.new(scraped_file)

  Create::AmazonBook.new(book_info).create_object
end




