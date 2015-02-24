require 'nokogiri'
require 'json'
require_relative './book.rb'
require_relative './box.rb'
require_relative '../books.rb'

module Items

  KEYS = [
    "title",
    "author",
    "price",
    "isbn-10",
    "shipping_weight"
  ]

  def self.book_selection(books, weigth=10)
    books.select{|book| book["shipping_weight"] <= weight}
  end

  def self.parse(books)
    contents = []
    books.map do |book|
      contents << Book.new(book["title"], book["author"], book["price"], book["isbn-10"], book["shipping_weight"])
    end
    contents
  end

  def self.book_object_to_hash(book)
    KEYS.zip(book.properties).to_h
  end

  def self.boxes(contents)
    boxes = []
    until contents.empty?
      box = Box.new
      box.add_book(contents.pop)
        while contents.first && box.add_book?(contents.first.weight)
          box.add_book(contents.shift)
        end
      boxes << box
    end
    boxes
  end 

  def self.box_object_to_hash(boxes)
    boxes.map do |box| 
      box_json = {}
      box_json["id"] = box.id
      box_json["total_weight"] = box.total_weight
      box.contents = box.contents.map do |book| 
        book_object_to_hash(book)
      end
      box_json["contents"] = box.contents
      box_json 
    end 
  end

end

