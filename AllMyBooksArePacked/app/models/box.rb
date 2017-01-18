class Box < ActiveRecord::Base
  has_many :books

  validates :totalWeight, presence: true

  def package(books)
  # divide into N boxes for shipping with each box having no more than 10lbs of books.
  end

  def packing_list
  # Output formatted JSON doc
  end

end
