get '/' do
  if Book.count > 0
    @books = Book.all
    Packer.package(@books)
    erb :'home'
  else
    Parser.parse_dir('data')
  end
end
