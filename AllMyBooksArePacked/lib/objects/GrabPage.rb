require 'nokogiri'
require 'open-uri'
require 'facets/enumerable/map_send'

class GrabAmazonPage
	attr_reader :page_list,:list  
	
	def parsable_object(arg)
		arg = File.open(arg)
     @page = Nokogiri::HTML(arg) 
		arg.close
		@page_list.push(@page)
	end

	def list_iterator 
		@list.map(&method(:parsable_object))
	end
end
