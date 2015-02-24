require '../lib/amazon.rb'
require 'open-uri'

RSpec.describe BoxPacker::AmazonProcessor do
  subject { Nokogiri::HTML(open("../data/book1.html")) }

  describe "#get_title" do
    it "returns the title from a file" do
      title = BoxPacker::AmazonProcessor.get_title(:file, subject)
      expect(title).to eq("Zealot: The Life and Times of Jesus of Nazareth")
    end
  end

  describe "#get_author" do
    it "returns the author from a file" do
      author = BoxPacker::AmazonProcessor.get_author(:file, subject)
      expect(author).to eq("Reza Aslan")
    end
  end

  describe "#get_price" do
    it "returns the price from a file" do
      price = BoxPacker::AmazonProcessor.get_price(:file, subject)
      expect(price).to eq("$16.89 USD")
    end
  end

  describe "#get_shipping_weight" do
    it "returns the author from a file" do
      weight = BoxPacker::AmazonProcessor.get_shipping_weight(:file, subject)
      expect(weight).to eq("1.2 pounds")
    end
  end

  describe "#get_isbn_10" do
    it "returns the author from a file" do
      isbn = BoxPacker::AmazonProcessor.get_isbn_10(:file, subject)
      expect(isbn).to eq("140006922X")
    end
  end

  describe "#get_book_info" do
    it "returns the title, author, price, shipping weight, isbn-10 from a file" do
      all_info = BoxPacker::AmazonProcessor.get_book_info(:file, subject)
      expect(all_info["title"]).to eq("Zealot: The Life and Times of Jesus of Nazareth")
      expect(all_info["author"]).to eq("Reza Aslan")
      expect(all_info["price"]).to eq("$16.89 USD")
      expect(all_info["shipping_weight"]).to eq("1.2 pounds")
      expect(all_info["isbn-10"]).to eq("140006922X")
    end
  end

  describe "#get_book_info" do
    it "returns the title, author, price, shipping weight, isbn-10 from Amazon's webpage (note: difference in price, weight from saved file)" do
      page_open = open("http://www.amazon.com/Zealot-Life-Times-Jesus-Nazareth/dp/140006922X")
      page = Nokogiri::HTML(page_open)
      all_info = BoxPacker::AmazonProcessor.get_book_info(:web, page)
      expect(all_info["title"]).to eq("Zealot: The Life and Times of Jesus of Nazareth")
      expect(all_info["author"]).to eq("Reza Aslan")
      expect(all_info["price"]).to eq("$15.23 USD")
      expect(all_info["shipping_weight"]).to eq("1.4 pounds")
      expect(all_info["isbn-10"]).to eq("140006922X")
    end
  end
  
end