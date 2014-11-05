class BoxContainer
  attr_reader :boxes

  def initialize(books)
    @boxes = [Box.new]

    books.sort_by(&:weight).reverse.each do |item|
      self << item
    end
  end

  def << item
    @boxes.each do |box|
      if box.can_hold?(item)
        box << item
        return
      end
    end

    box = Box.new
    box << item
    @boxes << box
  end

end

class Box
  attr_reader :items

  MAX_WEIGHT = 10.0 # weight limit in lb

  def initialize
    @items = []
  end

  def << item
    @items << item
  end

  def can_hold?(item)
    weight + item.weight <= MAX_WEIGHT
  end

  def weight
    @items.map(&:weight).inject(:+) || 0
  end
end

Package = Struct.new(:weight)




