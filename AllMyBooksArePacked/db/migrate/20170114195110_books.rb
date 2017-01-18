class Books < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :price_dollars
      t.float :weight_lbs
      t.string :isbn
      t.integer :box_id

      t.timestamps(null: false)
    end
  end
end
