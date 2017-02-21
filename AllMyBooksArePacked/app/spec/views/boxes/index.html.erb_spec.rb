require 'rails_helper'

RSpec.describe "boxes/index", type: :view do
  before(:each) do
    assign(:boxes, [
      Box.create!(
        :total_weight => "9.99"
      ),
      Box.create!(
        :total_weight => "9.99"
      )
    ])
  end

  it "renders a list of boxes" do
    render
    assert_select "tr>td", :text => "9.99".to_s, :count => 2
  end
end
