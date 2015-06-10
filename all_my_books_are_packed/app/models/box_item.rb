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

class BoxItem < ActiveRecord::Base
  belongs_to :box
  belongs_to :book
end
