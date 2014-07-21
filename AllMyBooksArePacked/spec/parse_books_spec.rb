require "./parse_books.rb"
require "pry-byebug"

describe Book do

  before :each do
    @book = Book.new("book1.html")
    @book2 = Book.new("book9.html")
    @book3 = Book.new("book11.html")
  end

  it "should be able to create a new book" do
    expect(@book).to be_an_instance_of Book
  end

  it "should be able to find a book's title" do
    expect(@book.title).to eq "Zealot: The Life and Times of Jesus of Nazareth"
    expect(@book2.title).to eq "A New Kind of Science"
    expect(@book3.title).to eq "The Europa Regional Surveys of the World Set 2011: 9-Volume Set"
  end

  it "should be able to find a book's author" do
    expect(@book.author).to eq "Reza Aslan"
    expect(@book2.author).to eq "Stephen Wolfram"
    expect(@book3.author).to eq "Europa Publications"
  end

  it "should be able to find a book's price" do
    expect(@book.price).to eq "$16.89 USD"
    expect(@book3.price).to eq "$7,450.00 USD"
  end

  it "should be able to find a book's price if it is a rental" do
    expect(@book2.price).to eq "$35.25 USD"
  end

  it "should be able to find a book's shipping weight" do
    expect(@book.shipping_weight).to eq "1.2 pounds"
    expect(@book2.shipping_weight).to eq "5.6 pounds"
    expect(@book3.shipping_weight).to eq "7.8 pounds"
  end

  it "should be able to find a book's numerical weight" do
    expect(@book.weight).to eq 1.2
    expect(@book2.weight).to eq 5.6
    expect(@book3.weight).to eq 7.8
  end

  it "should be able to find a book's isbn" do
    expect(@book.isbn).to eq 140006922
    expect(@book2.isbn).to eq 1579550088
    expect(@book3.isbn).to eq 1857435885
  end

end
