# create Box object with id, totalweight as string, 'has many books'
# divide into N boxes for shipping with each box having no more than 10lbs of books.
# Output formatted JSON doc

get '/' do
  if Book.count > 0
    @books = Book.all
    erb :'home'
  else
    Parser.parse_dir('data')
  end
end
