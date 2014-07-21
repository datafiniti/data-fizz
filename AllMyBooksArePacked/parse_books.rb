require 'nokogiri'
require 'nikkou'
require 'json'


module ParsePages

  class Book

    attr_reader :page, :title, :author, :price, :shipping_weight, :weight, :isbn

    def initialize(filename)
      @page = Nokogiri::HTML(open("data/#{filename}"))
    end

    def title
      @title = @page.css("#btAsinTitle").text
      @title.slice! " [Hardcover]"
      @title.slice! " [Paperback]"
      @title
    end

    def author
      @author = @page.css(".buying > span > a")[0].text
      @author
    end

    def price
      @price = @page.css(".priceLarge").text
      @price = @page.css(".rentPrice")[0].text if @price == ""
      @price += " USD"
      @price
    end

    def shipping_weight
      @shipping_weight = @page.search('li').text_includes('pounds').text.match(/[0-9].[0-9]\s[a-zA-Z]*/).to_s
      @shipping_weight
    end

    def weight
      @weight = @page.search('li').text_includes('pounds').text.match(/[0-9].[0-9]/).to_s.to_f
      @weight
    end

    def isbn
      @isbn = @page.search('li').text_includes('ISBN-10').text.gsub!(/ISBN-10: /, "").to_s.to_i
      @isbn
    end

  end

  class Ship

    attr_accessor :items, :max_weight

    def initialize(items, max_weight)
      @items = items
      @max_weight = max_weight
    end

    def calculate_boxes
      total_weight = 0
      @items.each do |item|
        total_weight += item.weight
      end

      if total_weight < max_weight
        num_boxes = 1
      else
      end
    end

  end

  class Bin

    attr_accessor :total_weight, :contents

    def initialize
      @total_weight = 0
      @contents = []
    end

    def add_content(content)
      @total_weight += content.weight
      @contents << content
    end

  end

end
