require 'nokogiri'
require 'open-uri'
require_relative 'web_scrapinizor'

module Parser

  class AmazonBookParser

    attr_reader :title, :author, :price, :shipping_weight, :isbn10

    def initialize(html_page)
      @html_page = html_page
      @title = parse_title
      @author = parse_author
      @price = parse_price
      @shipping_weight = parse_shipping_weight
      @isbn10 = parse_isbn10
    end

    def parse_title
      title = @html_page.css("h1 span#btAsinTitle").text
      title.length > 1 ? title : nil
    end

    def parse_author
      author = @html_page.css('div.buying span a').first.text
      author.length > 1 ? author : nil
    end

    def parse_price
      return @html_page.css('#actualPriceValue').text + " USD"
    end

    def parse_shipping_weight
      weight_string = @html_page.css('table#productDetailsTable div li:contains("Shipping Weight")').text
      return price_substring_clean(weight_string)
    end

    def parse_isbn10
      isbn_string = @html_page.css('table#productDetailsTable div li:contains("ISBN-10")').text
      return isbn_substring_clean(isbn_string)
    end

    private

    def price_substring_clean(string)
      return string.match(/\d+[.]\d+\s\w+/)
    end

    def isbn_substring_clean(string)
      return string.match(/\d{9,}+(\d|X)/)
    end


  end

end

html = Scrape::AmazonBook.new("./../data/book1.html").nokogiri_scrape

book = Parser::AmazonBookParser.new(html)

puts book.title
puts book.author
puts book.price
puts book.shipping_weight
puts book.isbn10