require 'pry'
require_relative 'box'

module BoxHelper
  def self.box_products(data_array)
    product_data = data_array
    
    boxes = [] # Array of hashes { {box: {box_info}}, {box: {box_info}}, ...}

    box_no = 1 #iterator

    loop do

      box = Box.new(box_no)
      box_info = box.format_info

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
