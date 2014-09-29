require_relative "./entities/Crawler.rb"
require_relative "./entities/Book.rb"
require_relative "./entities/Box.rb"
require_relative "./entities/Shipment.rb"
# ---------------------------------------------------

books = []
page_path = "./data/"

n = 1
book = ""

loop do

  begin
    page = Crawler.grab_page(page_path, n)
  rescue
    break
  end

  puts n
  book = Crawler.grab_book(page)
  books.push(book)
  n += 1

end

shipment = Shipment.new(books, 10)

p shipment.to_hash


