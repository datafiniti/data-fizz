class Book
  attr_accessor :title, :author, :price, :shipping_weight, :isbn_10
  def initialize(title, author, price, shipping_weight, isbn_10)
    @title = title 
    @author = author
    @price = price
    @shipping_weight = shipping_weight
    @isbn_10 = isbn_10
  end
  def to_hash
    return {
      title: @title,
      author: @author,
      price: @price,
      shipping_weight: @shipping_weight,
      isbn_10: @isbn_10
    }
  end
end