require 'Nokogiri'

module Items

  def self.data_content(directory)
    books = []
   
    Dir.foreach(directory) do |file|
      info = {}
      contents = File.open(File.dirname(__FILE__) + '/data/' + file)
      book = Nokogiri::HTML(contents)

      if book.css('#productDetailsTable').css('ul >li')[3..7]
      p =  book.css('#productDetailsTable').css('ul >li')[3..7]
    
      info["isbn-10"] = p.text.match(/ISBN-10: \d{9}[\d|X]/)[0].split(' ')[1]
      info["shipping_weight"] = p.text.match(/(\d+\.?\d+) pounds/)[0].split(' ').first.to_f
      end 
    
      info['price'] = book.css('#hardcover_meta_binding_winner').text.match(/\$(\d+\.\d+)|\$(\d+\,\d+\.\d+)/).to_a.first ||
          book.css("#actualPriceValue").css('.priceLarge').text.match(/\$(\d+\.\d+)|\$(\d+\,\d+\.\d+)/).to_a.first || 
          book.css("#combinedPriceBlock").css('span.a-size-medium').text.match(/\$(\d+\.\d+)|\$(\d+\,\d+\.\d+)/).to_a.first || ""  

      book.xpath("//meta[@name='description']/@content").each do |attr| 
        info["title"] = attr.value.split('[').first.strip
        info["author"] = attr.value.split('[')[1].split(']').first
      books << info
      end
    end 
  books
  
  end
end
