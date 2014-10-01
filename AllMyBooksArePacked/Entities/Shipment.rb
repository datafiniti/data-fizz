class Shipment
  attr_accessor :boxes
  def initialize (books, weight_split)
    @boxes = []
    @id = 0
    @weight_split = weight_split
    @books = books
    first_fit_decreasing
  end

  def to_hash
    boxes = @boxes.map {|box| box.to_hash}
    return boxes
  end

  private

  def first_fit_decreasing
    books = @books.sort_by! {|book| book.shipping_weight}
    @boxes.push(Box.new(@id+=1))
    while (books.length != 0)
      book = @books.pop
      index = @boxes.find_index {|box| box.totalWeight + book.shipping_weight <= @weight_split}
      if index
        @boxes[index].contents.push(book)
        @boxes[index].totalWeight += book.shipping_weight
      else 
        @boxes.push(Box.new(@id+=1))
        @boxes[-1].contents.push(book)
        @boxes[-1].totalWeight += book.shipping_weight        
      end
    end
  end

end