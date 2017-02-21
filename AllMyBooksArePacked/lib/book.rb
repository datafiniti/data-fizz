module Items
  class Book
    attr_reader :author, :title, :weight, :isbn
    attr_accessor :price

    def initialize(title, author, price, isbn, weight)
      @author = author
      @title = title
      @price = price
      @isbn = isbn
      @weight = weight
    end

    def properties
      [@title, @author, @price, @isbn, @weight]
    end 
  end
end

