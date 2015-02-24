require '../lib/box.rb'

RSpec.describe BoxPacker::Box do

  describe "#initialize" do
    it "creates a Box object with an id, weight (0), contents (empty)" do
      box = BoxPacker::Box.new(1)
      expect(box.id).to eq(1)
      expect(box.totalWeight).to eq(0)
      expect(box.contents).to eq([])
    end
  end

  describe "#attr" do
    it "id is readable, totalWeight and contents is accessible" do
      box = BoxPacker::Box.new(2)
      expect(box.id).to eq(2)
      box.totalWeight = 5
      expect(box.totalWeight).to eq(5)
      box.contents.push("test")
      expect(box.contents).to eq(["test"])
    end
  end

  describe "#display_weight" do
    it "display_weight adds pounds" do
      box = BoxPacker::Box.new(3)
      expect(box.id).to eq(3)
      expect(box.display_weight).to eq("0 pounds")
    end
  end

  describe "#self.weight_limit" do
    it "displays class attribute @@weight_limit" do
      expect(BoxPacker::Box.weight_limit).to eq(10)
    end
  end

  describe "#fits?" do
    it "returns true or false if book weight fits under box weight limit" do
      box = BoxPacker::Box.new(1)
      book = {"shipping_weight" => "1.1 pounds"}
      expect(box.fits?(book)).to be(true)
      book = {"shipping_weight" => "11.1 pounds"}
      expect(box.fits?(book)).to be(false)
      book = {"shipping_weight" => "5 pounds"}
      box.totalWeight = 5.5
      expect(box.fits?(book)).to be(false)
    end
  end

  describe "#add_book" do
    it "adds the book if the weight limit allows" do
      box = BoxPacker::Box.new(1)
      book = {"shipping_weight" => "1.5 pounds", "title" => "The Pledge"}
      expect(box.add_book(book)).to be(true)
      expect(box.contents.length).to eq(1)
      expect(box.contents[0]["title"]).to eq("The Pledge")

      book = {"shipping_weight" => "9 pounds", "title" => "Mason & Dixon"}
      expect(box.add_book(book)).to be(false)
      expect(box.contents.length).to eq(1)
      expect(box.contents[0]["title"]).to eq("The Pledge")
      
      book = {"shipping_weight" => "5 pounds", "title" => "Steve Jobs"}
      expect(box.add_book(book)).to be(true)
      expect(box.contents.length).to eq(2)
      expect(box.contents[0]["title"]).to eq("The Pledge")
      expect(box.contents[1]["title"]).to eq("Steve Jobs")
      expect(box.totalWeight).to eq(6.5)
    end
  end
  
end