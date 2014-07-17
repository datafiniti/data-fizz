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
    before(:each) do
      @box = db.create_shipping_box(total_weight: 1.0)
    end

    it "creates a shipping box record" do
      expect(@box.id).to_not eq(nil)
      expect(@box.total_weight).to eq(1.0)
    end

    it 'updates a shipping boxes weight' do 
      box = db.update_shipping_box_weight(@box.id, total_weight: 5.55)
      expect(box.id).to eq(@box.id)
      expect(box.total_weight).to eq(5.55)
    end

    it 'returns the first shipping box with a weight less than or equal to the inputted weight' do 
      db.create_shipping_box(total_weight: 5.55)
      db.create_shipping_box(total_weight: 4.89)
      box = db.get_box_by_weight(5)
      expect(box.id).to eq(@box.id)
      expect(box.total_weight).to eq(1.0)

      test2 = db.get_box_by_weight(1.0)
      expect(test2.id).to eq(@box.id)
    end

    it 'returns nil if there is no shipping box with a weight less than the inputted weight' do 
      expect(db.get_box_by_weight(0.5)).to eq(nil)
    end
  end
end