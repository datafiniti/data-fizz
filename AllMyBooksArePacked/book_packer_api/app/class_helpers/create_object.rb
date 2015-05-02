module Create
require_relative "book_parser"

  #An object that can take in an item (specifically a book), that has the ability to create ab object and store it in my database
  class AmazonBook

    def initialize(book)
      @book = book
    end

    #creates a book object in our DB
    def create_object
      Book.create(title: @book.title, author: @book.author, price: @book.price, shipping_weight: @book.shipping_weight, isbn_10: @book.isbn10)
    end

  end
end