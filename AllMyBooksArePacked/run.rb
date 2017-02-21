require 'json'

require_relative 'lib/shipping'
require_relative 'lib/domains/amazon'
require_relative 'lib/products/book'

products = []

# Add all books from html data to array of products
Dir["data/book*.html"].each do |file|
  book_path_html = Dir.pwd + '/' + file
  book_data = Amazon.parse_book(book_path_html)

  book = Book.new(
    book_data[:title],
    book_data[:price],
    book_data[:weight],
    book_data[:author],
    book_data[:isbn])

  products.push({
    "title" => book.name,
    "author" => book.author,
    "price" => "$" + book.price,
    "shipping_weight" =>  book.weight + " pounds",
    "isbn-10" => book.isbn10
  })
end

puts JSON.generate( { "boxes" => Shipping.ship(products) } )
