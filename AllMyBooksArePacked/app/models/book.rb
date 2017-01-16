class Book < ActiveRecord::Base

  validates :title, :author_last_name, :author_first_name, :price_dollars, :weight_lbs, :isbn, presence: true

end
