require 'spec_helper'

describe DF::ShowShippingBoxes do
  let(:db) {DF.db}
  before(:each) do
  	db.clear_tables
  	@box = db.create_shipping_box(total_weight: 1.9)
  end

  describe 'build_box_hash' do
	  it "gets the shipping boxes and puts them in the main hash" do
	    test_hash = {"box" => {'first_box' => {}}}
	    result = subject.build_box_hash(test_hash, @box)
	    expect(test_hash.keys.length).to eq(2)
	  end 
  end

  describe 'create_book_hash' do 
  	it "builds a hash out of a book's information" do 
  	  result = DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book6.html'))
  	  test = subject.create_book_hash(result.book)
  	  expect(test["title"]).to eq("The House of Hades (Heroes of Olympus, Book 4) [Hardcover]")
  	  expect(test["author"]).to eq("Rick Riordan")
  	  expect(test["price"]).to eq("$10.19 USD")
  	  expect(test["shipping weight"]).to eq("4.4 pounds")
  	  expect(test["isbn-10"]).to eq("1423146727")
  	end
  end

  before(:each) do 
    @result1 = DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book1.html'))
    DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book10.html'))
    DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book11.html'))
  end

  describe 'create_children_array' do 
  	it "gets all the books for a shipping box and creates an object of hashes with each book's info" do
  	  test = subject.create_children_array(@result1.book.shipping_boxes_id)
  	  expect(test.length).to eq(2)
  	  expect(test[0].class).to eq(Hash)
  	  expect(test[1].class).to eq(Hash)
  	end
  end

  describe 'run' do
  	it 'gets all the shipping boxes from the database and puts them and their children in a hash' do
  	  DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book12.html'))
      DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book13.html'))
      DF::AddBookToDatabase.run(DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book14.html'))
      result = subject.run
      expect(result.class).to eq(Hash)
      expect(result.keys.length).to eq(4)
  	end 
  end

  it 'gets all the books and returns them' do 
    file_array = Dir.entries("././AllMyBooksArePacked/data")
    file_array.each do |file|
      file_name = "./AllMyBooksArePacked/data/" + file
      html_doc = DF::AmazonCrawler.new(file_name)
      DF::AddBookToDatabase.run(html_doc)
    end
    result = DF::ShowShippingBoxes.run
    expect(result.keys.length).to_not eq(0)
  end
end