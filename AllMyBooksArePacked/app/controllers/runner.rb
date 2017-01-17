get '/' do
  if Book.count > 0
    @books = Book.all
    erb :'home'
  else
    Parser.parse_dir('data')
  end
end
