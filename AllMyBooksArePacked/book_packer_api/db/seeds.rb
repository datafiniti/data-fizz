require_relative '../app/class_helpers/web_scrapinizor'
require_relative '../app/class_helpers/book_parser'
# require_relative '../app/class_helpers/create_record'


files_to_scrape = Dir.entries('./../data').select{|file| file.include?("html")}

files_to_scrape.each do |file|

  puts file

end
