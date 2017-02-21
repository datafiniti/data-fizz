require 'bigdecimal'

class ParsePages::Bin

  attr_reader :total_weight, :contents

  def initialize
    @total_weight = 0
    @contents = []
  end

  def add_content(content, weight)
    # When adding numbers like 4.3 and 1.4, would get: 5.699999999999999
    # Use BigDecimal to make sure it adds up to 5.7
    @total_weight+=(BigDecimal(weight.to_s))
    @contents << content
  end


  def total_weight
    # If I set total_weight = total_weight.to_f, I would get the quirk above again.
    @total_weight.to_f
  end

end
