class Book < ActiveRecord::Base

  validates :title, :author_last_name, :author_first_name, :price_dollars, :weight_lbs, :isbn, presence: true

  def open_file
    file = File.read('data/book1.html')
    clean_file= HTMLWhitespaceCleaner.clean(file)
    doc= Nokogiri.parse(clean_file)
    prices = doc.css('.price')
  end

end
