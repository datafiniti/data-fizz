class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, null: false, index: true
      t.string :author, index: true
      t.decimal :price, precision: 8, scale: 2
      t.decimal :shipping_weight, precision: 8, scale: 2
      t.string :isbn_10

      t.timestamps null: false
    end
  end
end
