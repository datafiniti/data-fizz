module BoxPacker
  
  class Box
    attr_reader :id
    attr_accessor :totalWeight, :contents

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

    def add_book(book)
      if fits?(book)
        @totalWeight += book["shipping_weight"].split[0].to_f
        @contents.push(book)
        true
      else
        false
      end
    end

    def fits?(book)
      (book["shipping_weight"].split[0].to_f + @totalWeight) <= @@weight_limit
    end

  end
end