class ParsePages::Bin

  attr_accessor :total_weight, :contents

  def initialize
    @total_weight = 0
    @contents = []
  end

  def add_content(content)
    @total_weight += content.weight
    @contents << content
  end

end
