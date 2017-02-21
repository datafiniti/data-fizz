class AddIndexToTotalWeightOnShippingBoxTable < ActiveRecord::Migration
  def up
    add_index(:shipping_boxes, :total_weight)
  end
end
