module Items
    class Box
    attr_reader :id
    attr_accessor :total_weight, :contents 
    @@id = 1

    def initialize
      @id = @@id
      @total_weight = 0
      @contents = []  
      @@id +=1
    end

    def add_book?(weight)
      @total_weight + weight <=10
    end

    def add_book(b)
      @total_weight += b.weight
      @total_weight = @total_weight.round(2)
      @contents << b
    end

  end
end
