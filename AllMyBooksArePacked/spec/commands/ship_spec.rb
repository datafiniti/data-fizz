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
    answer = { success?: true, "boxes" => [
        {
          "box" => {
            "id" => 1,
            "totalWeight" => "6.8 pounds",
            "contents" => [
              {
                "title" => "A New Kind of Science",
                "author" => "Stephen Wolfram",
                "price" => "$35.25 USD",
                "shipping_weight" => "5.6 pounds",
                "isbn-10" => 1579550088
              },
              {
                "title" => "Zealot: The Life and Times of Jesus of Nazareth",
                "author" => "Reza Aslan",
                "price" => "$16.89 USD",
                "shipping_weight" => "1.2 pounds",
                "isbn-10" => 140006922
              }
            ]
          }
        }
      ]
    }
    expect(result).to eq answer
  end

  it "should return multiple boxes if the total weight is over the max weight" do
    @books << @book3
    result = @Ship.run(@books, 10)
    answer = { success?: true, "boxes" => [
        {
          "box" => {
            "id"=>1,
            "totalWeight"=>"9.0 pounds",
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
        },
        {
          "box" => {
            "id"=>2,
            "totalWeight"=>"5.6 pounds",
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
        }
      ]
    }
    expect(result).to eq answer
  end

  # Test for all of test data. Organized boxes by hand first.
  it "should organize the 20 test data books into 9 boxes correctly" do
    all_books = []
    20.times do |i|
      all_books << ParsePages::Book.new("book#{i+1}.html")
    end
    result = @Ship.run(all_books, 10)
    answer = { success?: true, "boxes" => [
        {
          "box" => {
            "id"=>1,
            "totalWeight"=>"9.4 pounds",
            "contents"=> [
              {
                "title"=>"The Ocean at the End of the Lane: A Novel [Deckle Edge]",
                "author"=>"Neil Gaiman",
                "price"=>"$15.22 USD",
                "shipping_weight"=>"9.4 pounds",
                "isbn-10"=>62255657
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>2,
            "totalWeight"=>"10.0 pounds",
            "contents"=> [
              {
                "title"=>"The Unforgiven",
                "author"=>"Alan LeMay",
                "price"=>"$8.97 USD",
                "shipping_weight"=>"8.8 pounds",
                "isbn-10"=>147780630
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
        },
        {
          "box" => {
            "id"=>3,
            "totalWeight"=>"10.0 pounds",
            "contents"=> [
              {
                "title"=>"The Europa Regional Surveys of the World Set 2011: 9-Volume Set",
                "author"=>"Europa Publications",
                "price"=>"$7,450.00 USD",
                "shipping_weight"=>"7.8 pounds",
                "isbn-10"=>1857435885
              },
              {
                "title"=>"I Wear the Black Hat: Grappling with Villains (Real and Imagined)",
                "author"=>"Chuck Klosterman",
                "price"=>"$15.49 USD",
                "shipping_weight"=>"2.2 pounds",
                "isbn-10"=>1439184496
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>4,
            "totalWeight"=>"9.8 pounds",
            "contents"=> [
              {
                "title"=>"World War Z: The Art of the Film",
                "author"=>"Titan Books", "price"=>"$15.83 USD",
                "shipping_weight"=>"7.6 pounds",
                "isbn-10"=>1781168857
              },
              {
                "title"=>"Sylvia Day Crossfire Series Boxed Set: Bared to You/Reflected in You/Entwined with You",
                "author"=>"Sylvia Day",
                "price"=>"$26.32 USD",
                "shipping_weight"=>"2.2 pounds",
                "isbn-10"=>425266060
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>5,
            "totalWeight"=>"10.0 pounds",
            "contents"=> [
              {
                "title"=>"Inquebrantable: Mi Historia, A Mi Manera (Atria Espanol) (Spanish Edition)",
                "author"=>"Jenni Rivera",
                "price"=>"$10.18 USD",
                "shipping_weight"=>"6.4 pounds",
                "isbn-10"=>1476745420
              },
              {
                "title"=>"The English Girl: A Novel (Gabriel Allon)",
                "author"=>"Daniel Silva",
                "price"=>"$16.46 USD",
                "shipping_weight"=>"3.6 pounds",
                "isbn-10"=>62073168
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>6,
            "totalWeight"=>"10.0 pounds",
            "contents"=> [
              {
                "title"=>"A New Kind of Science",
                "author"=>"Stephen Wolfram",
                "price"=>"$35.25 USD",
                "shipping_weight"=>"5.6 pounds",
                "isbn-10"=>1579550088
              },
              {
                "title"=>"The House of Hades (Heroes of Olympus, Book 4)",
                "author"=>"Rick Riordan",
                "price"=>"$10.19 USD",
                "shipping_weight"=>"4.4 pounds",
                "isbn-10"=>1423146727
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>7,
            "totalWeight"=>"9.5 pounds",
            "contents"=> [
              {
                "title"=>"Never Go Back: A Jack Reacher Novel",
                "author"=>"Lee Child",
                "price"=>"$17.52 USD",
                "shipping_weight"=>"4.9 pounds",
                "isbn-10"=>385344341
              },
              {
                "title"=>"Pacific Rim: Man, Machines, and Monsters",
                "author"=>"David S Cohen",
                "price"=>"$27.83 USD",
                "shipping_weight"=>"3.2 pounds",
                "isbn-10"=>1608871827
              },
              {
                "title"=>"The Cuckoo's Calling",
                "author"=>"Robert Galbraith",
                "price"=>"$17.47 USD",
                "shipping_weight"=>"1.4 pounds",
                "isbn-10"=>316206849
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>8,
            "totalWeight"=>"9.5 pounds",
            "contents"=> [
              {
                "title"=>"The Ocean at the End of the Lane: A Novel [Deckle Edge]",
                "author"=>"Neil Gaiman", "price"=>"$15.22 USD",
                "shipping_weight"=>"4.1 pounds",
                "isbn-10"=>62255657
              },
              {
                "title"=>"Man of Steel: Inside the Legendary World of Superman",
                "author"=>"Daniel Wallace",
                "price"=>"$31.07 USD",
                "shipping_weight"=>"2.8 pounds",
                "isbn-10"=>1608871819
              },
              {
                "title"=>"No god but God: The Origins and Evolution of Islam",
                "author"=>"Reza Aslan",
                "price"=>"$8.99 USD",
                "shipping_weight"=>"2.6 pounds",
                "isbn-10"=>385739761
              }
            ]
          }
        },
        {
          "box" => {
            "id"=>9,
            "totalWeight"=>"6.4 pounds",
            "contents"=> [
              {
                "title"=>"The English Girl: A Novel (Gabriel Allon)",
                "author"=>"Daniel Silva",
                "price"=>"$16.46 USD",
                "shipping_weight"=>"3.6 pounds",
                "isbn-10"=>62073168
              },
              {
                "title"=>"The Pioneer Woman Cooks: A Year of Holidays: 135 Step-by-Step Recipes for Simple, Scrumptious Celebrations",
                "author"=>"Ree Drummond",
                "price"=>"$20.29 USD",
                "shipping_weight"=>"1.4 pounds",
                "isbn-10"=>62225227
              },
              {
                "title"=>"This Town: Two Parties and a Funeral-Plus, Plenty of Valet Parking!-in America's Gilded Capital",
                "author"=>"Mark Leibovich",
                "price"=>"$15.37 USD",
                "shipping_weight"=>"1.4 pounds",
                "isbn-10"=>399161309
              }
            ]
          }
        }
      ]
    }
    expect(result).to eq answer
  end

end
