json.extract! box, :id, :total_weight
json.content box.books, partial: 'books/book', as: :book
