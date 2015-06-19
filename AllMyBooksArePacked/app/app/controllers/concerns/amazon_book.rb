class AmazonBook

  def initialize(file)
    @file = file
  end

  def to_book
    @book ||= self.gen_book
  end

  def gen_book
    @book = Book.new
    html_doc = Nokogiri::HTML(@file)
    
    @book.title = html_doc.at_css('#btAsinTitle').try(:text)
    @book.price = html_doc.at_css('.priceLarge').try(:text).try(:match, '\d+\.?\d*').try(:to_s)
    @book.author = html_doc.at_css('.buying span a').try(:text)
    properties = Hash[ html_doc.css('#productDetailsTable li').map {|f| [f.at_css('b').try(:text).try(:strip).try(:sub,':', ''), f.children[1].try(:text).try(:strip) ] } ]

    @book.shipping_weight = properties['Shipping Weight'].try(:match, '\d+\.?\d*').try(:to_s).try(:to_d)
    @book.isbn_10 = properties['ISBN-10'].try(:to_s)
    
    @book
  end
end
