require_relative './interface.rb'
require_relative './box.rb'
require 'json'

module BoxPacker
  class PackingAgent

    #############################
    # Basic Creation Functions
    #############################

    def initialize(origin, order)
      @boxes = []
      @sorted_library = self.order_books_by_weight(self.get_order(origin, order))      
    end

    def get_order(origin, order)
      case origin
      when :folder
        return BoxPacker::Interface.read_html_files_from(order)
      when :web
        return BoxPacker::Interface.read_pages_from(order)
      end
    end

    def order_books_by_weight(library)
      library.sort_by {|book| book["shipping_weight"].split[0].to_f }
    end

    #############################
    # Accessor and Formatting
    #############################

    def boxes
      @boxes
    end

    def sorted_library
      @sorted_library
    end

    def print(option)
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
        print_order_to_json(prepped)
      when :pretty
        pretty_print_order(prepped)
      end
    end

    def print_order_to_json(prepped)
      prepped.to_json
    end

    def pretty_print_order(prepped)
      jj prepped
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
        if box.try_adding_book(book)
          return
        end
      end
      self.create_box(book)
    end

    def create_box(book)
      id_for_new_box = @boxes.empty? ? 1 : @boxes.last.id + 1
      new_box = BoxPacker::Box.new(id_for_new_box)
      new_box.try_adding_book(book)
      @boxes.push(new_box)
    end

  end
end