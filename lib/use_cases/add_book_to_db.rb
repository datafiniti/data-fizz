require 'ostruct'

module DF
  class AddBookToDatabase < Command
    def run(book)
      b_title = book.parse_book_title
      b_author = book.parse_book_author
      b_price = book.parse_book_price
      b_weight = book.parse_book_weight
      b_isbn = book.parse_book_isbn

      if b_title && b_author && b_price && b_weight && b_isbn
      	return success :book => DF.db.create_book_product(title: b_title, 
      													author: b_author, 
      													price: b_price, 
      													shipping_weight: b_weight, 
      													isbn10: b_isbn)
      else 
      	return failure("Improper information.")
      end
    end

    def get_shipping_box_id(weight)
      new_weight = 10.00 - weight
      result = DF.db.get_box_by_weight(new_weight) 
      if result
      	update_box_weight(result, weight)
      	result.id
      else
      	DF.db.create_shipping_box(total_weight: weight).id
      end
    end

    def update_box_weight(box, weight)
      old_weight = box.total_weight
      DF.db.update_shipping_box_weight(box.id, total_weight: old_weight + weight)
    end
  end
end
