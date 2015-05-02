class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :price
      t.string :shipping_weight
      t.integer :isbn_10

      t.timestamps null: false
    end
  end
end
