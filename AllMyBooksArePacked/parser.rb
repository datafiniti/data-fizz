require 'rubygems'
require 'nokogiri'
require 'json'
require 'pry'  

require_relative './scripts/scrape.rb'
require_relative './scripts/product.rb'
require_relative './scripts/box.rb'
require_relative './scripts/boxHelper.rb'
require_relative './scripts/jsonHelper.rb'


################################# 

f = Dir.glob('**/*.html').count

product_count = Array(1..f)

product_data = []

product_count.each do |n|
  scraped_info = Scrape.new(n)
  product_data << scraped_info.build_product
end

boxes = BoxHelper.box_products(product_data)

JsonHelper.write_file(boxes)