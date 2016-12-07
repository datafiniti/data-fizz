require 'json'
require_relative 'book_parser'
require_relative 'book_packer'
def main
  max_weight = 10
  books = BookParser.new(params).parse
  bins = BookPacker.new(books, max_weight).pack
  result = bins.map{|bin| bin.print}
  puts result.to_json
end

def params
  params_array = []
  1.upto(20) do |i|
    params_array.push 'data/book' + i.to_s + '.html'
  end
  params_array
end

main
