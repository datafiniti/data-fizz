json.array!(@boxes) do |box|
  json.box do
    json.id box.id
    json.totalWeight "#{box.books.map{ |book| book.shipping_weight }.inject(:+)} pounds"
    json.contents do
      json.array!(box.books) do |book|
        json.title book.title
        json.author book.author
        json.price "$#{book.price} USD"
        json.shippingWeight "#{book.shipping_weight} pounds"
        json.isbn10 book.isbn_10
      end
    end
  end
end
