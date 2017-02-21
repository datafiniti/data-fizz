class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author
      t.decimal :price, precision: 8, scale: 2
      t.decimal :shipping_weight, precision: 8, scale: 2, index: true
      t.string :isbn_10

      t.timestamps null: false
    end
  end
end
