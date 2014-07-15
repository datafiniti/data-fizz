require 'nokogiri' 
require 'open-uri'

module DF
  class WebCrawler
  	attr_reader :source
  	def initialize(source)
  	  @source = source
  	end

  	def create_html_object
	  Nokogiri::HTML(open(@source))   
  	end
  end
end