# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  capacity   :decimal(6, 2)    default("10")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'rails_helper'

RSpec.describe Box, type: :model do
  describe "#add" do
    before do
      DatabaseCleaner.clean
      @box = Box.new
    end

    it "adds books having weight < capacity" do
      book = Book.new(title: "test", shipping_weight: 5)
      expect(@box.books.size).to eq(0)
      @box.add(book)
      expect(@box.capacity).to eq(5)
      expect(@box.books.size).to eq(1)
    end

    it "adds books having weight == capacity" do
      book = Book.new(title: "test", shipping_weight: 10)
      expect(@box.books.size).to eq(0)
      @box.add(book)
      expect(@box.capacity).to eq(0)
      expect(@box.books.size).to eq(1)
    end

    it "does not add books having weight > capacity" do
      book = Book.new(title: "test", shipping_weight: 11)
      expect(@box.books.size).to eq(0)
      @box.add(book)
      expect(@box.capacity).to eq(10)
      expect(@box.books.size).to eq(0)
    end
  end
end
