class BooksController < ApplicationController
  def index
    @books = Book.all
    render json: @books, :except => [:id, :created_at, :updated_at]
  end
end
