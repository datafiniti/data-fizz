# == Schema Information
#
# Table name: boxes
#
#  id         :integer          not null, primary key
#  capacity   :decimal(6, 2)    default("10")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Box < ActiveRecord::Base
  has_many :box_items, dependent: :destroy
  has_many :books, through: :box_items, source: :book

  def add(item)
    self.capacity = self.capacity - item.shipping_weight
    books << item
    save
  end
end
