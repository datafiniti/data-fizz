require 'rails_helper'

RSpec.describe "boxes/show", type: :view do
  before(:each) do
    @box = assign(:box, Box.create!(
      :total_weight => "9.99"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/9.99/)
  end
end
