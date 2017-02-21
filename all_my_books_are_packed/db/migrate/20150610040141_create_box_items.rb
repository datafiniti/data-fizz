class CreateBoxItems < ActiveRecord::Migration
  def change
    create_table :box_items do |t|
      t.integer :box_id, null: false, index: true
      t.integer :book_id, null: false, index: true
      t.timestamps null: false
    end
  end
end
