# William Hudgins
# Datafiniti Coding Challenge
# PackableItem.rb
# 06/30/15
#
# Contains a class to represent a packable item

require_relative 'JSONable'

## This class represents a packable item
class PackableItem 
  ## Constructor for the PackableItem object
  # === Attributes
  # +title+ - item's title
  # +price+ - item's sales price
  # +shiping_weight+ - item's shipping weight
  def initialize(title, price, shipping_weight) 
    @title = title;
    @price = price;
    @shipping_weight = shipping_weight;
    self.extend(JSONable)
  end

  # [R/W] accessor for title
  attr_accessor :title

  # [R/W] accessor for price
  attr_accessor :price	

  # [R/W] accessor for shipping weight
  attr_accessor :shipping_weight	
end
