class Box < ActiveRecord::Base
  has_many :books

  validates :totalWeight, presence: true
end
