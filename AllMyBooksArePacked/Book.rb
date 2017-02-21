# Datafiniti Coding Challenge
# Book.rb
# 06/30/15
#
# Contains a class to represent a book using key information

require_relative 'PackableItem'
require_relative 'JSONable'

##
# This class represents a book
class Book < PackableItem 

  # Constructor for the Book object
  #
  # === Attributes
  # +title+ - book's title
  # +author+ - book's author
  # +price+ - book's sales price
  # +shiping_weight+ - book's shipping weight
  # +isbn10+ - book's ISBN-10 number
  def initialize (title, author, price, shipping_weight, isbn10)
    super(title, price, shipping_weight);
	@author = author;
	@isbn10 = isbn10;
    self.extend(JSONable)
  end
   
  # [R/W] accessor for author
  attr_accessor :author	

  # [R/W] accessor for ISBN-10
  attr_accessor :isbn10
end
