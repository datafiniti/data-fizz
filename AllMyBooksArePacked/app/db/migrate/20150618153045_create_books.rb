class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.decimal :price, null: false
      t.decimal :shipping_weight, null: false
      t.string :isbn_10, null: false

      t.references :box, index: true, foreign_key: true
      
      t.timestamps null: false
    end
  end
end
