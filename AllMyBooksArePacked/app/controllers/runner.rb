get '/' do
  if Book.count > 0
    @books = Book.all
    Packer.package(@books) if Box.count == 0
    content_type :json
    boxes = Box.all
    books = Book.all
    collection = Hash.new
    oversized = books.where("weight_lbs > 10")
    oversized.each do |oversized_book|
      collection[oversized_book.title] = "BOOK TOO LARGE TO FIT IN BOX"
    end
    json_oversized = JSON[collection.to_json]
    json_boxes = JSON[boxes.to_json(:include => [:books])]
    JSON.pretty_generate([json_oversized, json_boxes])
  else
    Parser.parse_dir('data')
  end
end
