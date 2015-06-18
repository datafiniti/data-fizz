class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.decimal :price
      t.decimal :shipping_weight
      t.integer :isbn_10

      t.references :box, index: true, foreign_key: true
      
      t.timestamps null: false
    end
  end
end
