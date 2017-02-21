require '../lib/packingagent.rb'

RSpec.describe BoxPacker::PackingAgent do
  before(:context) do
    @packer = BoxPacker::PackingAgent.new(:file, "data")
  end

  describe "#initialize" do
    it "is created with an empty array for boxes and a sorted library" do
      expect(@packer.boxes).to eq([])    
      expect(@packer.sorted_library.length).to eq(20)
      expect(@packer.sorted_library[0]["shipping_weight"]).to eq("1.2 pounds")
      expect(@packer.sorted_library[19]["shipping_weight"]).to eq("9.4 pounds")
    end
  end

  describe "#create_box" do
    it "creates a box to put a book in" do
      book = {"shipping_weight" => "1.5 pounds", "title" => "The Pledge"}
      @packer.create_box(book)
      expect(@packer.boxes.first.class).to eq(BoxPacker::Box)
      expect(@packer.boxes.first.contents.length).to eq(1)
      expect(@packer.boxes.first.contents[0]["title"]).to eq("The Pledge")
      expect(@packer.boxes.first.totalWeight).to eq(1.5)
      expect(@packer.boxes.first.id).to eq(1)
    end
  end

  describe "#find_box_for" do
    it "finds a box for a book, taking weight into account" do
      book = {"shipping_weight" => "9 pounds", "title" => "Mason & Dixon"}
      @packer.find_box_for(book)
      expect(@packer.boxes.length).to eq(2)
      expect(@packer.boxes.first.contents.length).to eq(1)
      expect(@packer.boxes.first.contents[0]["title"]).to eq("The Pledge")
      expect(@packer.boxes.first.totalWeight).to eq(1.5)
      expect(@packer.boxes.first.id).to eq(1)

      expect(@packer.boxes[1].contents.length).to eq(1)
      expect(@packer.boxes[1].contents[0]["title"]).to eq("Mason & Dixon")
      expect(@packer.boxes[1].totalWeight).to eq(9)
      expect(@packer.boxes[1].id).to eq(2)

      book = {"shipping_weight" => "3 pounds", "title" => "The Joy of Cooking"}
      @packer.find_box_for(book)
      expect(@packer.boxes.length).to eq(2)
      expect(@packer.boxes[0].contents.length).to eq(2)
      expect(@packer.boxes[0].contents[0]["title"]).to eq("The Pledge")
      expect(@packer.boxes[0].contents[1]["title"]).to eq("The Joy of Cooking")
      expect(@packer.boxes[0].totalWeight).to eq(4.5)
    end
  end

  describe "#ship_order" do
    it "ships order by arranging boxes using simple first-fit algorithm" do
      @packer = BoxPacker::PackingAgent.new(:file, "data")
      @packer.ship_order
      expect(@packer.boxes.length).to be <= 10
      expect(@packer.sorted_library). to eq([])
    end
  end

end