require 'ostruct'
require 'active_record'

module DF
  class ShowShippingBoxes < Command
    def run
      boxes_hash = {}
      all_boxes = DF.db.get_all_shipping_boxes
      all_boxes.each do |box|
      	new_box_hash = build_box_hash(boxes_hash, box)
      	new_box_hash["contents"] += create_children_array(box.id)
      end
      boxes_hash
    end

    def build_box_hash(box_hash, box_object)
      return box_hash["box" + "#{box_object.id}"] = {
      	"id" => box_object.id,
      	"totalWeight" => box_object.total_weight,
      	"contents" => []
      }
    end

    def create_children_array(box_id)
      result = DF.db.get_books_in_box(box_id)
      result.map{|book| create_book_hash(book)}
    end

    def create_book_hash(book)
     {
      "title" => book.title,
      "author" => book.author,
      "price" => book.price,
      "shipping weight" => book.shipping_weight,
      "isbn-10" => book.isbn10
     }
    end
  end
end