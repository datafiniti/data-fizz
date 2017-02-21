class CreateShippingBoxTable < ActiveRecord::Migration
  create_table :shipping_boxes do |t|
    t.float :total_weight, :default => 0.0
  end
end
