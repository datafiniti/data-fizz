# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  capacity   :decimal(6, 2)    default("10")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class BoxTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
