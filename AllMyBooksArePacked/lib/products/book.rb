require_relative '../product'

class Book < Product 
  attr_accessor :author
  attr_accessor :isbn10

  def initialize(name, price, weight, author, isbn10)  
    super(name, price, weight)
    @author = author
    @isbn10 = isbn10 
  end
end  
