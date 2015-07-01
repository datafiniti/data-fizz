# William Hudgins
# Datafiniti Coding Challenge
# Box.rb
#
# Contains a class to represent a box. Requires PackableItem class. 

require_relative 'PackableItem'
require_relative 'JSONable'

## This class represents a box. 
# Requires PackableItem class found in PackableItem.rb
class Box
  ## Constructor for the Boox object
  # === Attributes
  # +id+ - unique ID number for box
  # +capacity+ - capacity box can ship in pounds
  def initialize(id, capacity) 
    @id = id;
    @capacity = capacity;
    @content = Array.new;
    @total_weight = 0;
    self.extend(JSONable)
  end

  # [R/W] accessor for box ID
  attr_accessor :title

  # [R] accessor for total box capacity in pounds
  attr_reader :capacity

  # [R] accessor for total weight of the box's contents
  attr_reader :total_weight
  
  ## Returns a deep-copy of the box's contents
  def get_content
    return @content.to_enum
  end

  ## Returns the box's remaining shipping capacity in pounds
  def get_free_capacity 
    return @capacity - @total_weight;
  end

  ##Adds an item to the box's contents
  #  
  # ===Attributes
  # +item+ -item to be packed  
  # === Returns
  # Returns true if packed successfully, false otherwise
  def pack_item(item) 
    success = false;
    if (@total_weight + item.shipping_weight <= @capacity) 
      @content.push(item);
      @total_weight += item.shipping_weight;
      success = true;
    end
    return success;
  end

  # Removes an item from the box's contents. If duplicates, only deletes first.
  #
  # === Attributes
  # +title+ title of item to be removed
  # === Returns
  # Returns whether the removal operation was successful. Will return
  #    false if the item was not in this box
  def removeItem(title)
    success = @content.delete_at(@content.index(title) || @content.length) 
    return success ? true : false
  end
end
