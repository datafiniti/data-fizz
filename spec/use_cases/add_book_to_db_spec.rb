require 'spec_helper'

describe DF::AddBookToDatabase do
  let(:db) {DF.db}
  before(:each) do
  	db.clear_tables
  end

  describe 'run' do 
  	let(:book) {DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book5.html')}
	it "adds a book's title, author, price, shipping weight, and isbn10 to the database" do
	  result = subject.run(book)
	  expect(result.success?).to eq(true)
	  expect(result.book.title).to eq("The English Girl: A Novel (Gabriel Allon) [Hardcover]")
	  expect(result.book.author).to eq("Daniel Silva")
	  expect(result.book.price).to eq("$16.46 USD")
	  expect(result.book.shipping_weight).to eq("3.6 pounds")
	  expect(result.book.isbn10).to eq("0062073168")
	  expect(result.book.shipping_boxes_id).to_not be_nil
	end

	it 'adds the book to a new shipping box if the weight exceeds any available boxes' do
	  result = subject.run(book)
	  expect(result.success?).to eq(true)
	  expect(result.book.shipping_boxes_id).to_not be_nil
	end

	it 'adds the book to a shipping box with enough available space (less than 10)' do
  	  box = db.create_shipping_box(total_weight: 4.1)
	  result = subject.run(book)
	  expect(result.success?).to eq(true)
	  expect(result.book.shipping_boxes_id).to eq(box.id)
	end

	it 'returns an error if improper information is gathered from the book' do 
	  test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
	  result = subject.run(test)
	  expect(result.success?).to eq(false)
	  expect(result.error).to eq("Improper information.")
	end
  end

  describe 'place_in_box' do 
  	it "creates a box record if there is no box with a weight less than the inputted weight and returns that box's id" do 
  	  expect(subject.get_shipping_box_id("5.0 pounds")).to_not be_nil
  	end

  	it 'returns the id of the box that the item should be put in if there db query does not return nil' do 
  	  box = db.create_shipping_box(total_weight: 4.1)
  	  expect(subject.get_shipping_box_id("5.9 pounds")).to eq(box.id)
  	end
  end

  describe 'update_box_weight' do
	it "updates the box's total weight with the inputted weight" do 
  	  box = db.create_shipping_box(total_weight: 4.1)
	  result = subject.update_box_weight(box, 2.33)
	  expect(result.id).to eq(box.id)
	  expect(result.total_weight).to eq(6.43)
	end 
  end
end