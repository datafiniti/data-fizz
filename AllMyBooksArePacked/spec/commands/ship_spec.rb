require "spec_helper.rb"
require "pry-byebug"

describe ParsePages::Ship do

  before :each do
    @book = ParsePages::Book.new("book1.html")
    @book2 = ParsePages::Book.new("book9.html")
    @book3 = ParsePages::Book.new("book11.html")
    @books = [@book, @book2]
    @Ship = ParsePages::Ship.new
  end

  it "should take an array of items" do
    expect{@Ship.run(@books, 10)}.to_not raise_error
  end

  it "should return one box if the total weight is less than the max weight" do
    result = @Ship.run(@books, 10)
    answer = {
      "box" => {
        "id" => 1,
        "totalWeight" => 6.8,
        "contents" => [
          {
            "title" => "Zealot: The Life and Times of Jesus of Nazareth",
            "author" => "Reza Aslan",
            "price" => "$16.89 USD",
            "shipping_weight" => "1.2 pounds",
            "isbn-10" => 140006922
          },
          {
            "title" => "A New Kind of Science",
            "author" => "Stephen Wolfram",
            "price" => "$35.25 USD",
            "shipping_weight" => "5.6 pounds",
            "isbn-10" => 1579550088
          }
        ]
      }
    }
    # Although expect is the preferred syntax
    # should is useful here for comparing the hash,
    # which fails using the expect syntax
    result.should =~ answer
  end

  it "should return multiple boxes if the total weight is over the max weight" do
    @books << @book3
    result = @Ship.run(@books, 10)
    answer = {}
    answer.compare_by_identity
    answer["box"] = {
        "id"=>1,
        "totalWeight"=>9.0,
        "contents"=> [
          {
            "title"=>"The Europa Regional Surveys of the World Set 2011: 9-Volume Set",
            "author"=>"Europa Publications",
            "price"=>"$7,450.00 USD",
            "shipping_weight"=>"7.8 pounds",
            "isbn-10"=>1857435885
          },
          {
            "title"=>"Zealot: The Life and Times of Jesus of Nazareth",
            "author"=>"Reza Aslan",
            "price"=>"$16.89 USD",
            "shipping_weight"=>"1.2 pounds",
            "isbn-10"=>140006922
          }
        ]
      }
    answer["box"] = {
        "id"=>2,
        "totalWeight"=>5.6,
        "contents"=> [
          {
            "title"=>"A New Kind of Science",
            "author"=>"Stephen Wolfram",
            "price"=>"$35.25 USD",
            "shipping_weight"=>"5.6 pounds",
            "isbn-10"=>1579550088
          }
        ]
      }
    result.should =~ answer
  end

end
