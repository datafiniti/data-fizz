require 'rubygems'
require 'nokogiri'
require 'json'
require 'pry'  

require_relative './scripts/scrape.rb'
require_relative './scripts/product.rb'
require_relative './scripts/box.rb'
require_relative './scripts/boxHelper.rb'
require_relative './scripts/jsonHelper.rb'


f = Dir.glob('**/*.html').count

product_count = Array(1..f)

product_data = []

# For each product file in subdirectory 'data', scrapes and collects desired information.
product_count.each do |n|
  scraped_info = Scrape.new(n) # Object with attributes for pertinent info (ie @title, @weight, etc)
  product_data << scraped_info.build_product # Array << Array
end

# Loops through product_data and sorts them into Boxes; returns JSON-parseable Array.
boxes = BoxHelper.box_products(product_data)

# Parses Array of Box and Product information; writes to .json file.
JsonHelper.write_file(boxes)