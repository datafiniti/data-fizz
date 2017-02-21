class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.decimal :total_weight, null: false, default: 0

      t.timestamps null: false
    end
  end
end
