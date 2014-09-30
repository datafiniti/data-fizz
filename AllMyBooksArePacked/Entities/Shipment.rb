class Shipment
  attr_accessor :boxes
  def initialize (books, weight_split)
    @boxes = []
    @weight_split = weight_split
    @books = books
    create_boxes
    pack_boxes    
  end

  def to_hash
    boxes = @boxes.map {|box| box.to_hash}
    return boxes
  end

  private

  def create_boxes
    sum = 0
    
    @books.each do |book|
      sum += book.shipping_weight
    end

    number_of_boxes = (sum/@weight_split).ceil  
  
    number_of_boxes.times do |id|
      @boxes << Box.new(id+1)
    end
  end

  def pack_boxes
    @books.sort_by! {|book| book.shipping_weight}
    while (@books.length != 0)
      book = @books.pop
      add_book(book)
    end
  end

  def add_book(book)
    lightest_box_index = 0
    lightest_box_weight = @boxes[0].totalWeight

    @boxes.each_with_index do |box, index|
      next if index === 0
      if box.totalWeight < lightest_box_weight 
        lightest_box_index = index
        lightest_box_weight = box.totalWeight
      end
    end

    @boxes[lightest_box_index].contents.push(book)
    @boxes[lightest_box_index].update_box_weight

  end

end