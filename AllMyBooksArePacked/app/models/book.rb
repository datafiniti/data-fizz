class Book < ActiveRecord::Base
  belongs_to :box

  validates :title, :author, :price_dollars, :weight_lbs, :isbn, presence: true, uniqueness: true
end
