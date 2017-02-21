require 'spec_helper.rb'
require_relative '../../app/class_helpers/web_scrapinizor'
require_relative '../../app/class_helpers/book_parser'


RSpec.describe Parser::AmazonBookParser do

  let(:scrape) {Scrape::AmazonBook.new("./../data/book1.html").nokogiri_scrape}

  let(:book) {Parser::AmazonBookParser.new(scrape)}

  it "successfully parsed the title" do
    expect(book.title).to eq("Zealot: The Life and Times of Jesus of Nazareth [Hardcover]")
  end

  it "successfully parsed the author" do
    expect(book.author).to eq("Reza Aslan")
  end

  it "successfully parsed the price" do
    expect(book.price).to match(/\d+(?:[.,]\d+)?/)
  end

  it "succefully parsed the shipping weight" do
    expect(book.shipping_weight.to_s).to match(/\d{0,}.+(\d{0,})/)
  end

  it "successfully parsed the ISBN-10 #" do
    expect(book.isbn10.to_s).to match(/\d{9,}+(\d|X)/)
  end

  it "everything is all good!" do
    expect(book.title).to eq("Zealot: The Life and Times of Jesus of Nazareth [Hardcover]")
    expect(book.author).to eq("Reza Aslan")
    expect(book.price).to match(/\d+(?:[.,]\d+)?/)
    expect(book.shipping_weight.to_s).to match(/\d{0,}.+(\d{0,})/)
    expect(book.isbn10.to_s).to match(/\d{9,}+(\d|X)/)
  end

end