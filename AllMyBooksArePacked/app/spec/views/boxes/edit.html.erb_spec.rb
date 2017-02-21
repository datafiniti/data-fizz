require 'rails_helper'

RSpec.describe "boxes/edit", type: :view do
  before(:each) do
    @box = assign(:box, Box.create!(
      :total_weight => "9.99"
    ))
  end

  it "renders the edit box form" do
    render

    assert_select "form[action=?][method=?]", box_path(@box), "post" do

      assert_select "input#box_total_weight[name=?]", "box[total_weight]"
    end
  end
end
