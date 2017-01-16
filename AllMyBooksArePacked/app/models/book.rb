class Book < ActiveRecord::Base

  validates :title, :author, :price_dollars, :weight_lbs, :isbn, presence: true
, uniqueness: true
end
