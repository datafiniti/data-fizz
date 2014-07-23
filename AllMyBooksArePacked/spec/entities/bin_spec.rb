require "spec_helper.rb"
require "pry-byebug"

describe ParsePages::Bin do

  before :each do
    @book = ParsePages::Book.new("book1.html")
    @book2 = ParsePages::Book.new("book9.html")
    @book3 = ParsePages::Book.new("book11.html")
    @Bin = ParsePages::Bin.new
  end

  it "should be an instance of Bin" do
    expect(@Bin).to be_an_instance_of ParsePages::Bin
  end

  it "should have an initial total weight of zero" do
    expect(@Bin.total_weight).to eq 0
  end

  it "should initially have an emptry array of contents" do
    expect(@Bin.contents).to eq []
  end

  it "should be able to add a new item" do
    @Bin.add_content(@book)
    expect(@Bin.contents.length).to eq 1
    expect(@Bin.contents).to include(@book)
    expect(@Bin.total_weight).to eq @book.weight
  end

  it "should be able to add multiple items and update the total weight" do
    @Bin.add_content(@book)
    @Bin.add_content(@book2)
    @Bin.add_content(@book3)
    expect(@Bin.contents.length).to eq 3
    expect(@Bin.contents).to include(@book, @book2, @book3)
    weight = @book.weight + @book2.weight + @book3.weight
    expect(@Bin.total_weight).to eq weight
  end

end
