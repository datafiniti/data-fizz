require 'rails_helper'

RSpec.describe "books/new", type: :view do
  before(:each) do
    assign(:book, Book.new(
      :title => "MyString",
      :author => "MyString",
      :price => "9.99",
      :shipping_weight => "9.99",
      :isbn_10 => 1
    ))
  end

  it "renders new book form" do
    render

    assert_select "form[action=?][method=?]", books_path, "post" do

      assert_select "input#book_title[name=?]", "book[title]"

      assert_select "input#book_author[name=?]", "book[author]"

      assert_select "input#book_price[name=?]", "book[price]"

      assert_select "input#book_shipping_weight[name=?]", "book[shipping_weight]"

      assert_select "input#book_isbn_10[name=?]", "book[isbn_10]"
    end
  end
end
