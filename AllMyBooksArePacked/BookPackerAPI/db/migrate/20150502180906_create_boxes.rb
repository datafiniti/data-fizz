class CreateBoxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.string :totalWeight, default: "0.0 pounds"
      t.string :contents, array: true, default: []

      t.timestamps null: false
    end
  end
end
