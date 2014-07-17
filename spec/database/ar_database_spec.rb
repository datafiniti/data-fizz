require 'spec_helper.rb'

describe DF::ActiveRecordDatabase do
  let(:db) {subject}
  before(:each) do
  	db.clear_tables
  	@book_product = {title: "The English Girl: A Novel (Gabriel Allon)", author: "Daniel Silva", price: "$16.46", shipping_weight: "3.6 pounds", isbn10: "0062073168"}
  end

  describe 'book_product_information' do
    it "creates a record of a book's product information, including title, author, isbn10, weight, and price" do
    	book = db.create_book_product(@book_product)
      expect(book.title).to eq("The English Girl: A Novel (Gabriel Allon)")
      expect(book.author).to eq("Daniel Silva")
      expect(book.price).to eq("$16.46")
      expect(book.shipping_weight).to eq("3.6 pounds")
      expect(book.isbn10).to eq("0062073168")
    end
  end

  describe 'shipping_boxes' do 
    it "creates a shipping box record" do
      box = db.create_shipping_box
      expect(box.id).to_not eq(nil)
      expect(box.total_weight).to eq(0.0)
    end
  end
end