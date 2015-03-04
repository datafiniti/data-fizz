module Shipping 

  def self.ship products
    
    boxes = []
    id = 0

    # Divide products into N boxes, max weight 10 pounds per box
    # Greedy Solution - O(n^2)
    products = products.sort_by! { |item| get_shipping_weight item }.reverse
    while products.length > 0
      box = {
        :contents => [],
        :weight => 0
      }
      products.delete_if do |item|
        item_weight = get_shipping_weight item
        if box[:weight] + item_weight <= 10
          # Add item to box
          box[:weight] += item_weight
          box[:contents].push(item)
        end
      end
      boxes.push(box)
    end

    boxes.map do |box|
      {
        "id" => id += 1,
        "totalWeight" => box[:weight],
        "contents" => box[:contents]
      }
    end
  end

  private

  def self.get_shipping_weight item
    idx = item['shipping_weight'].index(" pounds")
    item['shipping_weight'][0..idx-1].to_f
  end
end
