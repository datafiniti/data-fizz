require 'nokogiri'
require 'open-uri'

module Scrape

  class AmazonBook
    def initialize(url)
      @url = url
    end

    def nokogiri_scrape
      return Nokogiri::HTML(open(@url))
    end

  end
end


#User/Console Testing
# puts Scrape::AmazonBook.new("./../data/book1.html").nokogiri_scrape