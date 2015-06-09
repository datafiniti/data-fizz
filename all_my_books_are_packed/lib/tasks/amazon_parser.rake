require_relative 'amazon_parser.rb'

task :scrape_amazon_books => :environment do
  AmazonParser.new.run
end
