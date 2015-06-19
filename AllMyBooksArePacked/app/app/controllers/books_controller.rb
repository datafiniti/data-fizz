class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  # GET /books
  # GET /books.json
  def index
    @books = Book.all
  end

  # GET /books/1
  # GET /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
  end

  def upload_form
  end

  def upload
    @files = params[:book].try(:[], :file)
    respond_to do |format|
      if @files
        success = true
        @files.each do |file|
          amazon_book = AmazonBook.new(file)
          @book = amazon_book.to_book
          unless @book.save && Box.add_book(@book)
            success = false
          end
        end
        if success
          format.html { redirect_to books_path, notice: 'Books were successfully created.' }
          format.json { render :show, status: :created, location: @book }
        else
          format.html {  redirect_to books_path, notice: 'Some Books were not successfully created.' }
          format.json { render json: { notice: 'failed to upload' }, status: :unprocessable_entity }
        end
      else
        format.html { render :upload_form, notice: 'No File' }
        format.json { render json: {notice: 'no  file'}, status: :unprocessable_entity }
      end
    end

  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_book
    @book = Book.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def book_params
    params.require(:book).permit(:title, :author, :price, :shipping_weight, :isbn_10, :box, :box_id)
  end
end
