class Box < ActiveRecord::Base
  has_many :books
  
  validates_presence_of :total_weight

  def self.add_book(book)
    #sort book into first avaible box
    box = Box.last || Box.new
    if (box.total_weight + book.shipping_weight) > 10
      box = Box.new
    end
    box.books << book
    box.total_weight += book.shipping_weight
    box.save
  end
end
