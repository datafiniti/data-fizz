class CreateBookProductInformationTable < ActiveRecord::Migration
  create_table :book_product_information do |t|
    t.string :title
    t.string :author
    t.string :price
    t.string :shipping_weight
    t.string :isbn10
  end
end
