require 'rails_helper'

RSpec.describe "books/index", type: :view do
  before(:each) do
    assign(:books, [
      Book.create!(
        :title => "Title",
        :author => "Author",
        :price => "9.99",
        :shipping_weight => "1.99",
        :isbn_10 => 1
      ),
      Book.create!(
        :title => "Title",
        :author => "Author",
        :price => "9.99",
        :shipping_weight => "1.99",
        :isbn_10 => 1
      )
    ])
  end

  it "renders a list of books" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "Author".to_s, :count => 2
    assert_select "tr>td", :text => "9.99".to_s, :count => 2
    assert_select "tr>td", :text => "1.99".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
