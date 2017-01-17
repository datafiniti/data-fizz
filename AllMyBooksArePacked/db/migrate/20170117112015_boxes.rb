class Boxes < ActiveRecord::Migration
  def change
    create_table :boxes do |t|
      t.string :totalWeight

      t.timestamps(null: false)
    end
  end
end
