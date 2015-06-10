class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.decimal :capacity, precision: 6, scale: 2, default: 10
      t.timestamps null: false
    end
  end
end
