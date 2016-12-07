class Bin
  def initialize(book, id, maximum_weight)
    @id = id
    @contents = [book]
    @maximum_weight = maximum_weight
    @total_weight = book[:numerical_weight]
  end

  def id
    @id
  end

  def total_weight
    @total_weight
  end

  def add(book)
    @total_weight += book[:numerical_weight]
    @contents.push book
  end

  def enough_room(book)
    @maximum_weight - @total_weight > book[:numerical_weight]
  end

  def print
    {box: {
      id: @id,
      contents: @contents,
      total_weight: @total_weight
    }}
  end
end
