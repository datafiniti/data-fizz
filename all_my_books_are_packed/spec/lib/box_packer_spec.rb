require 'box_packer.rb'

describe BoxPacker do
  describe 'best_fit' do
    it 'packs books' do
      DatabaseCleaner.clean
      items = [{'title' => 'A', 'shipping_weight' => 5},
                {'title' => 'B', 'shipping_weight' => 6},
                {'title' => 'C', 'shipping_weight' => 4},
                {'title' => 'D', 'shipping_weight' => 5}]
      items.map!{ |input| Book.create(input) }
      box_packer = BoxPacker.new(Book.all.order(shipping_weight: :desc))
      boxes = box_packer.best_fit
      expect(boxes[0].books.first.title).to eq('B')
      expect(boxes[0].books.last.title).to eq('C')
      expect(boxes[1].books.first.title).to eq('A')
      expect(boxes[1].books.last.title).to eq('D')
    end
  end

end
