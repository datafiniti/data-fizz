module Packer

  def self.package(books)
    total_weight = 0
    box = Box.new
    books.each do |book|
      if total_weight + book.weight_lbs <= 10
        box.books << book
      else
        box.totalWeight = total_weight
        box.save
        box = Box.new
        total_weight = 0
        box.books << book
      end
      total_weight += book.weight_lbs
    end
  end

end
