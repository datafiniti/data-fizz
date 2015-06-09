# == Schema Information
#
# Table name: books
#
#  id              :integer          not null, primary key
#  title           :string           not null
#  author          :string
#  price           :decimal(8, 2)
#  shipping_weight :decimal(8, 2)
#  isbn_10         :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Book < ActiveRecord::Base
  validates_presence_of :title
  #price stored in USD
  #shipping_weight stored in pounds
end
