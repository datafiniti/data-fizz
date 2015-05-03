class Book < ActiveRecord::Base
  #association that is pretty self explanatory
  belongs_to :box

end
