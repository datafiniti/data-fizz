require './lib/parser.rb'
require './books.rb'

module Items
  def self.structured_data
    books = Items::data_content("data/")
    selected_books = books.select{|book| book["shipping_weight"] <=10}
    ordered_books = selected_books.sort_by{|book| book["shipping_weight"]}
    parsed_books = Items::parse(ordered_books)
    boxes = Items::boxes(parsed_books)   
    Items::box_object_to_hash(boxes).to_json
  end
end  

# p Items::box_object_to_hash(boxes)