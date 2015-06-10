# == Schema Information
#
# Table name: box_items
#
#  id         :integer          not null, primary key
#  box_id     :integer          not null
#  book_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BoxItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
