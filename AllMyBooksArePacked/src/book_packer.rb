require_relative 'book_packer'
require_relative 'bin'

class BookPacker
  def initialize(books, maximum_weight)
    @last_id = 0
    # sorts so we start with the biggest and work down.
    # Thus filling most of each bin first and then filling in the gaps
    @books = books.sort{|book1, book2| book2[:numerical_weight] <=> book1[:numerical_weight]}
    @maximum_weight = maximum_weight
  end

  def pack
    result = @books.reduce([]) do |bins, book|
      bins = bins.sort{|bin1, bin2| bin2.total_weight <=> bin1.total_weight}
      add_to_bins book, bins
    end
    result.sort{|bin1, bin2| bin1.id <=> bin2.id}
  end

  private

  def add_to_bins(book, bins)
    added = false
    bins.each do |bin|
      if bin.enough_room book
        added = true
        bin = bin.add book
        break
      end
    end
    unless added
      bins = bins.push create_bin(book)
    end
    bins
  end

  def create_bin(book)
    @last_id += 1
    Bin.new book, @last_id, @maximum_weight
  end
end
