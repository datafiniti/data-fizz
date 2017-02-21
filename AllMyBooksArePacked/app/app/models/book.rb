class Book < ActiveRecord::Base
  belongs_to :box

  validates_presence_of :title, :author, :price, :shipping_weight, :isbn_10

end
