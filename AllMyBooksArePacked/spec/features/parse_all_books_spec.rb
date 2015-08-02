require 'spec_helper'

RSpec.describe BookParser do
  describe '#parse' do
    it 'parses all books without being stubbed' do
      book_parser = BookParser.new(params)
      expect(book_parser.parse).to eq(expected_result)
    end
  end

  def params
    params_array = []
    1.upto(20) do |i|
      params_array.push 'data/book' + i.to_s + '.html'
    end
    params_array
  end

  def expected_result
    [
      {
        title: 'Zealot: The Life and Times of Jesus of Nazareth',
        author: 'Reza Aslan',
        price: '$16.89',
        weight: '1.2 pounds',
        numerical_weight: 1.2,
        'isbn-10': '140006922X'
      },
      {
        title: 'Pacific Rim: Man, Machines, and Monsters',
        author: 'David S Cohen, Guillermo del Toro',
        price: '$27.83',
        weight: '3.2 pounds',
        numerical_weight: 3.2,
        'isbn-10': '1608871827'
      },
      {
        title: "Inquebrantable: Mi Historia, A Mi Manera (Atria Espanol) (Spanish Edition)",
        author: "Jenni Rivera",
        price: "$10.18",
        weight: "6.4 pounds",
        numerical_weight: 6.4,
        'isbn-10': "1476745420"
      },
      {
        title: "Sylvia Day Crossfire Series Boxed Set: Bared to You/Reflected in You/Entwined with You",
        author: "Sylvia Day",
        price: "$26.32",
        weight: "2.2 pounds",
        numerical_weight: 2.2,
        'isbn-10': "0425266060"
      },
      {
        title: "The English Girl: A Novel (Gabriel Allon)",
        author: "Daniel Silva",
        price: "$16.46",
        weight: "3.6 pounds",
        numerical_weight: 3.6,
        'isbn-10': "0062073168"
      },
      {
        title: "The House of Hades (Heroes of Olympus, Book 4)",
        author: "Rick Riordan",
        price: "$10.19",
        weight: "4.4 pounds",
        numerical_weight: 4.4,
        'isbn-10': "1423146727"
      },
      {
        title: "This Town: Two Parties and a Funeral-Plus, Plenty of Valet Parking!-in America's Gilded Capital",
        author: "Mark Leibovich",
        price: "$15.37",
        weight: "1.4 pounds",
        numerical_weight: 1.4,
        'isbn-10': "0399161309"
      },
      {
        title: "The Pioneer Woman Cooks: A Year of Holidays: 135 Step-by-Step Recipes for Simple, Scrumptious Celebrations",
        author: "Ree Drummond",
        price: "$20.29",
        weight: "1.4 pounds",
        numerical_weight: 1.4,
        'isbn-10': "0062225227"
      },
      {
        title: "A New Kind of Science",
        author: "Stephen Wolfram",
        price: "$35.25",
        weight: "5.6 pounds",
        numerical_weight: 5.6,
        'isbn-10': "1579550088"
      },
      {
        title: "The Ocean at the End of the Lane: A Novel",
        author: "Neil Gaiman",
        price: "$15.22",
        weight: "4.1 pounds",
        numerical_weight: 4.1,
        'isbn-10': "0062255657"
      },
      {
        title: "The Europa Regional Surveys of the World Set 2011: 9-Volume Set",
        author: "Europa Publications",
        price: "$7,450.00",
        weight: "7.8 pounds",
        numerical_weight: 7.8,
        'isbn-10': "1857435885"
      },
      {
        title: "No god but God: The Origins and Evolution of Islam",
        author: "Reza Aslan",
        price: "$8.99",
        weight: "2.6 pounds",
        numerical_weight: 2.6,
        'isbn-10': "0385739761"
      },
      {
        title: "Man of Steel: Inside the Legendary World of Superman",
        author: "Daniel Wallace, Zack Snyder",
        price: "$31.07",
        weight: "2.8 pounds",
        numerical_weight: 2.8,
        'isbn-10': "1608871819"
      },
      {
        title: "World War Z: The Art of the Film",
        author: "Titan Books",
        price: "$15.83",
        weight: "7.6 pounds",
        numerical_weight: 7.6,
        'isbn-10': "1781168857"
      },
      {
        title: "I Wear the Black Hat: Grappling with Villains (Real and Imagined)",
        author: "Chuck Klosterman",
        price: "$15.49",
        weight: "2.2 pounds",
        numerical_weight: 2.2,
        'isbn-10': "1439184496"
      },
      {
        title: "The Ocean at the End of the Lane: A Novel",
        author: "Neil Gaiman",
        price: "$15.22",
        weight: "9.4 pounds",
        numerical_weight: 9.4,
        'isbn-10': "0062255657"
      },
      {
        title: "The Unforgiven",
        author: "Alan LeMay",
        price: "$8.97",
        weight: "8.8 pounds",
        numerical_weight: 8.8,
        'isbn-10': "147780630X"
      },
      {
        title: "The Cuckoo's Calling",
        author: "Robert Galbraith, J.K. Rowling",
        price: "$17.47",
        weight: "1.4 pounds",
        numerical_weight: 1.4,
        'isbn-10': "0316206849"
      },
      {
        title: "The English Girl: A Novel (Gabriel Allon)",
        author: "Daniel Silva",
        price: "$16.46",
        weight: "3.6 pounds",
        numerical_weight: 3.6,
        'isbn-10': "0062073168"
      },
      {
        title: "Never Go Back: A Jack Reacher Novel",
        author: "Lee Child",
        price: "$17.52",
        weight: "4.9 pounds",
        numerical_weight: 4.9,
        'isbn-10': "0385344341"
      }
    ]
  end
end
