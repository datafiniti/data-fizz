class Domain 
  attr_reader :name

  def initialize(name)
    @name = name
    @products = {}
  end

  def self.save product_data
    @products[product_data[:id]] = product_data
  end

  def self.destroy product_id
    @products.delete(product_id)
  end

  def self.find product_id
    @products[product_id]
  end

  def self.find_all
    @products.keys
  end

end
