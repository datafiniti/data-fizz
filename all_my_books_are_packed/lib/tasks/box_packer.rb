require 'json'

class BoxPacker
  def initialize(items = [], max_capacity = 10)
    @max_capacity = max_capacity
    @items = items
    @boxes = []
  end

  def add(item)
    # option to add items after initialization
    @items << item
  end

  def best_fit
    @items.each do |item|
      best_fit_index = nil
      best_remaining_capacity = @max_capacity
      @boxes.each_with_index do |box, index|
        potential_remaining_capacity = check_remaining_capacity(box, item)
        if potential_remaining_capacity < best_remaining_capacity
          best_fit_index = index
          best_remaining_capacity = potential_remaining_capacity
        end
      end

      if best_remaining_capacity == @max_capacity
        add_to_new_box(item)
      else
        @boxes[best_fit_index].add(item)
      end
    end

    @boxes.map do |box|
      o = {}
      o[:totalWeight] = @max_capacity - box.capacity
      o[:contents] = box.contents
      o.to_json
    end
  end

  private

  def add_to_new_box(item)
    new_box = Box.new
    new_box.add(item)
    @boxes << new_box
  end


  def check_remaining_capacity(box, item)
    #returning max capacity will not allow placing item in box
    remaining_capacity = box.capacity - item['shipping_weight']
    remaining_capacity >= 0 ? remaining_capacity : @max_capacity
  end

end

class Box
  attr_reader :contents, :capacity

  def initialize(capacity = 10)
    @capacity = capacity
    @contents = []
  end

  def add(item)
    if @capacity >= item['shipping_weight']
      @contents << item
      @capacity -= item['shipping_weight']
      return true
    end

    false
  end
end

