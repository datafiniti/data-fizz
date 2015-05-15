require 'pry'
require_relative 'box'

# Module: BoxHelper
#
# Toolbox for sorting product data.
#
# Public Methods:
# + box_products

module BoxHelper
  
  # Public: .box_products
  # Loops through all "Products" and assigns them to a Box object, with no Box exceeding 10 pounds. Collects those Boxes in a format to be parsed as JSON.
  #
  # Parameters:
  # + data_array  : Array of Arrays
  #
  # Returns:
  # Array: Array containing multiple Hashes, each representing a Box object containing representations of Product objects.
  #
  # State Changes:
  # Creates new Box instances.
  
  def self.box_products(data_array)
    product_data = data_array
    
    boxes = [] # Array of hashes { {box: {box_info}}, {box: {box_info}}, ...}

    box_no = 1 # Iterator

    loop do
      box = Box.new(box_no)
      box_info = box.format_info
      
      # This loop works but should be revised.
      product_data.each do |product|
        if product[0][:weight] + box_info[:totalWeight] <= 10
          box_info[:totalWeight] += product[0][:weight]
          box_info[:contents] << product[1] #product info hash (excludes weight measurement)
          product_data.delete_at(product_data.index(product))
        end # if statement
      end # .each do loop

      boxes << {box: box_info}

      box_no += 1

      if product_data.length < 1
        break
      end #if loop to break parent
    end #loop

    return boxes
  end #method
  
end #class
