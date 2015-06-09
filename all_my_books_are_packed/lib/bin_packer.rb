class BinPacker
  def initialize(items = [], max_capacity = 10)
    @max_capacity = max_capacity
    @items = items
    @bins = []
  end

  def add(item)
    # option to add items after initialization
    @items << item
  end

  def first_fit
    @items.each do |item|
      added = false
      @bins.each_with_index do |bin, index|
        if bin.add(item)
          added = true
          break
        end
      end

      add_to_new_bin(item) unless added
    end

    @bins.map{ |bin| bin.contents }
  end

  def best_fit_with_sorting
    @items.sort! { |a, b| b['shipping_weight'] <=> a['shipping_weight'] }
    @items.each do |item|
      best_fit_index = nil
      best_remaining_capacity = @max_capacity
      @bins.each_with_index do |bin, index|
        potential_remaining_capacity = check_remaining_capacity(bin, item)
        if potential_remaining_capacity < best_remaining_capacity
          best_fit_index = index
          best_remaining_capacity = potential_remaining_capacity
        end
      end

      if best_remaining_capacity == @max_capacity
        add_to_new_bin(item)
      else
        @bins[best_fit_index].add(item)
      end
    end

    @bins.map{ |bin| bin.contents }
  end

  private

  def add_to_new_bin(item)
    new_bin = Bin.new
    new_bin.add(item)
    @bins << new_bin
  end


  def check_remaining_capacity(bin, item)
    #returning max capacity will not allow placing item in bin
    remaining_capacity = bin.capacity - item['shipping_weight']
    remaining_capacity >= 0 ? remaining_capacity : @max_capacity
  end

end

class Bin
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

class OrderItem
  def initialize(item, weight)
    @shipping_weight =
    @item
  end
end
