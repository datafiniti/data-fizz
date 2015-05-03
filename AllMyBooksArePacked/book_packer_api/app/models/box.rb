class Box < ActiveRecord::Base

  #grants access to Book
  require_dependency "book"

  #Serializes the contents so it is put in array
  serialize :contents, Array


  has_many :books

  #Method I came up with to determin if there was another box that I could pack
  def next
    self.class.unscoped.where("id > ?", self.id).order("id ASC")
  end

end
