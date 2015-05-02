class BooksController < ApplicationController

  #route returns a json of all the books scraped
  def index
    @books = Book.all
    render json: @books, :except => [:id, :created_at, :updated_at]
  end
end
