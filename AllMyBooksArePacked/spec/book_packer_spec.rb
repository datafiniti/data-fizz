require 'spec_helper'

RSpec.configure do |c|
  c.include TestData
end
RSpec.describe BookPacker do
  describe '#pack' do
    it 'packs books into bins' do
      max_weight = 10
      book_packer = BookPacker.new test_data, max_weight
      bins = book_packer.pack
      bins.each do |bin|
        expect(bin.total_weight).to be < max_weight
      end
    end
  end
end
