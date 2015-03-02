class Product
  attr_accessor :name
  attr_accessor :price
  attr_accessor :weight
  @@id = -1

  def initialize(name, price, weight)
    @name = name
    @price = price
    @weight = weight
    @@id += 1
    @id = @@id
  end

end
