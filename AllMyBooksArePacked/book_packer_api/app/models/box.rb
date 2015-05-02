class Box < ActiveRecord::Base

  require_dependency "book"

  serialize :contents, Array
  has_many :books

  def next
    self.class.unscoped.where("id > ?", self.id).order("id ASC")
  end
end
