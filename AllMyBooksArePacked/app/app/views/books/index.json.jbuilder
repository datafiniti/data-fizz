json.array!(@books) do |book|
  json.extract! book, :id, :title, :author, :price, :shipping_weight, :isbn_10
  json.url book_url(book, format: :json)
end
