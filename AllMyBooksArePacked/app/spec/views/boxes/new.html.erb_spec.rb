require 'rails_helper'

RSpec.describe "boxes/new", type: :view do
  before(:each) do
    assign(:box, Box.new(
      :total_weight => "9.99"
    ))
  end

  it "renders new box form" do
    render

    assert_select "form[action=?][method=?]", boxes_path, "post" do

      assert_select "input#box_total_weight[name=?]", "box[total_weight]"
    end
  end
end
