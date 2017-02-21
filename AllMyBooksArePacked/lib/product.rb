class Product
  attr_accessor :name
  attr_accessor :price
  attr_accessor :weight

  def initialize(name, price, weight)
    @name = name
    @price = price
    @weight = weight
  end

end
