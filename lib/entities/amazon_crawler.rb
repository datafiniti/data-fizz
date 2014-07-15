require 'nokogiri' 

module DF
  class AmazonCrawler < WebCrawler
  	def initialize(source)
  	  super(source)
  	end
  end
end