class AddShippingBoxIdToBookTable < ActiveRecord::Migration
  def change
    add_reference :book_product_information, :shipping_boxes, index: true
  end
end
