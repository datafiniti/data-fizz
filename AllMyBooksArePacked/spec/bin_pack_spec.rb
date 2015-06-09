require 'bin_pack.rb'

describe BinPacker do
  describe 'first_fit' do
    it 'handles empty input' do
      bin_packer = BinPacker.new
      expect(bin_packer.first_fit).to eq([])
    end

    it 'handles non-trivial case' do
      items = [{'title' => 'A', 'shipping_weight' => 3},
                {'title' => 'B', 'shipping_weight' => 6},
                {'title' => 'C', 'shipping_weight' => 8},
                {'title' => 'D', 'shipping_weight' => 3},
                {'title' => 'E', 'shipping_weight' => 4},
                {'title' => 'F', 'shipping_weight' => 6}]
      bin_packer = BinPacker.new(items)
      results = bin_packer.first_fit
      expect(results[0][0]).to eq({'title' => 'A', 'shipping_weight' => 3})
      expect(results[0][1]).to eq({'title' => 'B', 'shipping_weight' => 6})
      expect(results[1][0]).to eq({'title' => 'C', 'shipping_weight' => 8})
      expect(results[2][0]).to eq({'title' => 'D', 'shipping_weight' => 3})
      expect(results[2][1]).to eq({'title' => 'E', 'shipping_weight' => 4})
      expect(results[3][0]).to eq({'title' => 'F', 'shipping_weight' => 6})
    end
  end

  describe 'best_fit_with_sorting' do
    it 'handles non-trivial case' do
      items = [{'title' => 'A', 'shipping_weight' => 5},
                {'title' => 'B', 'shipping_weight' => 6},
                {'title' => 'C', 'shipping_weight' => 4},
                {'title' => 'D', 'shipping_weight' => 5}]
      bin_packer = BinPacker.new(items)
      results = bin_packer.best_fit_with_sorting
      expect(results[0][0]).to eq({'title' => 'B', 'shipping_weight' => 6})
      expect(results[0][1]).to eq({'title' => 'C', 'shipping_weight' => 4})
      expect(results[1][0]).to eq({'title' => 'A', 'shipping_weight' => 5})
      expect(results[1][1]).to eq({'title' => 'D', 'shipping_weight' => 5})
    end
  end

end
