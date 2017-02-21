# William Hudgins
# Datafiniti Coding Challenge
# Packer.rb
# 07/01/15
#
# Contains a class providing an packing tool used to pack N packable items into
#  M boxes of a specified capacity. Requires both the Box and PackableItem classes.

require_relative 'PackableItem'
require_relative 'Box'

## This class provides a packer to pack N packable items into M boxes of a specified
# capacity. Requires Box and PackableItem classes, found in Box.rb and PackableItem.rb
# respectively.
class Packer 
  ## Creates a packer used to pack boxes of the specified capacity
  #
  # +capacity+ - capacity, in pounds, of each box to be used
  def initialize(capacity) 
    @capacity = capacity;
    @box = Array.new; # collection of boxes
    @box.push(Box.new("1", capacity));
  end

  # Packs N items into M boxes of specified capacity
  #
  # @param +item+ - items to be packaged
  def pack_items(item) 
    item.each do |current_item|
      packed = false;

      # Check if item will fit in any open boxes
      @box.each do |current_box|
        if (current_box.get_free_capacity >= current_item.shipping_weight) 
          current_box.pack_item(current_item);
          packed = true;
        end
        break if packed
      end

      # If a new box needs to be opened  
      if (!packed) 
        @box.push(Box.new((@box.length + 1), 10));
        @box[-1].pack_item(current_item);
      end
    end
  end
  
  # [R] accessor for the boxes. Returns shallow copy.
  attr_reader :box
end
