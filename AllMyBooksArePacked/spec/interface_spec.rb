require '../lib/interface.rb'

RSpec.describe BoxPacker::Interface do

  describe "#read_html_files_from" do
    it "returns the book data from all files in a folder" do
      library = BoxPacker::Interface.read_html_files_from("data")
      expect(library.length).to eq(20)
      expect(library[0]["title"]).to eq("Zealot: The Life and Times of Jesus of Nazareth")
    end
  end

  describe "#read_pages_from" do
    it "returns the book data from a given webpage" do
      library = BoxPacker::Interface.read_pages_from("http://www.amazon.com/Zealot-Life-Times-Jesus-Nazareth/dp/140006922X")
      expect(library.length).to eq(1)
      expect(library[0]["title"]).to eq("Zealot: The Life and Times of Jesus of Nazareth")
    end
  end

  describe "#read_pages_from" do
    it "returns the book data from all given webpages" do
      library = BoxPacker::Interface.read_pages_from("http://www.amazon.com/Zealot-Life-Times-Jesus-Nazareth/dp/140006922X", "http://www.amazon.com/god-but-God-Updated-Edition/dp/0812982444", "http://www.amazon.com/The-Girl-Train-A-Novel/dp/1594633665")
      expect(library.length).to eq(3)
      expect(library[2]["title"]).to eq("The Girl on the Train: A Novel")
    end
  end
  
end