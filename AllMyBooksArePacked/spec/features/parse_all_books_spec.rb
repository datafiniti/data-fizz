require 'spec_helper'

RSpec.configure do |c|
  c.include TestData
end
RSpec.describe BookParser do
  describe '#parse' do
    it 'parses all books without being stubbed' do
      book_parser = BookParser.new(params)
      expect(book_parser.parse).to eq(test_data)
    end
  end

  def params
    params_array = []
    1.upto(20) do |i|
      params_array.push 'data/book' + i.to_s + '.html'
    end
    params_array
  end

end
