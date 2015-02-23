module BoxPacker
  
  class Box
    attr_reader :id
    attr_accessor :totalWeight
    attr_accessor :contents

    @@weight_limit = 10

    def initialize(id)
      @id = id
      @totalWeight = 0
      @contents = []
    end

    def display_weight
      "#{@totalWeight} pounds"
    end

    def self.weight_limit
      @@weight_limit
    end

    def try_adding_book(book)
      if can_this_book_go_in_this_box?(book)
        @totalWeight += book["shipping_weight"].split[0].to_f
        @contents.push(book)
        return true
      else
        return false
      end
    end

    def can_this_book_go_in_this_box?(book)
      if (book["shipping_weight"].split[0].to_f + @totalWeight) <= @@weight_limit
        return true
      else
        return false
      end
    end

  end
end