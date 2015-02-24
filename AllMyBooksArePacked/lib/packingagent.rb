require_relative './interface.rb'
require_relative './box.rb'
require 'json'

module BoxPacker
  class PackingAgent

    attr_reader :boxes, :sorted_library

    #############################
    # Basic Creation Functions
    #############################

    def initialize(from, folder_name)
      @boxes = []
      order = self.get_order(from, folder_name)      
      @sorted_library = self.sort_by_weight(order)
    end

    def get_order(from, folder_name)
      case from
      when :file
        BoxPacker::Interface.read_html_files_from(folder_name)
      when :web
        BoxPacker::Interface.read_pages_from(folder_name)
      end
    end

    def sort_by_weight(order)
      order.sort_by {|book| book["shipping_weight"].split[0].to_f }
    end

    #############################
    # Accessor and Formatting
    #############################

    def print(option=:json)
      prepped = @boxes.inject({}) do |order, box|
        order.merge(
          box.id => 
          {
            "id": box.id,
            "totalWeight": "#{box.totalWeight} pounds",
            "contents": box.contents
          }
        )
      end

      case option
      when :json
        prepped.to_json
      when :pretty
        jj prepped
      end
    end

    #############################
    # Packing Boxes Functions
    #############################

    def ship_order
      until @sorted_library.empty?
        heaviest_book_left = @sorted_library.delete(@sorted_library.last)
        find_box_for(heaviest_book_left)
      end
    end

    def find_box_for(book)
      @boxes.each do |box|
        if box.add_book(book)
          return
        end
      end
      self.create_box(book)
    end

    def create_box(book)
      id_for_new_box = @boxes.empty? ? 1 : @boxes.last.id + 1
      new_box = BoxPacker::Box.new(id_for_new_box)
      new_box.add_book(book)
      @boxes.push(new_box)
    end

  end
end