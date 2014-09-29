class Box
  attr_accessor :id, :totalWeight, :contents
  def initialize (id=nil, totalWeight=0.0, contents=[])
    @id = id
    @totalWeight = totalWeight
    @contents = contents
  end
  def update_box_weight
    @totalWeight = 0
    @contents.each do |book|
      @totalWeight += book.shipping_weight
    end
  end
  def to_hash
    contents = @contents.map {|book| book.to_hash}
    return {
      id: @id,
      totalWeight: @totalWeight,
      contents: contents
    }
  end
end