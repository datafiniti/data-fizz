require 'nokogiri'
require 'open-uri'

class Crawler
  # grab page from path and n parameters
  # returns page
  def self.grab_page(path, n)
    page = Nokogiri::HTML(open("./data/book#{n}.html"))
    return nil if page == nil
    return page
  end

  # grab book from page, this is Amazon specific
  # returns Book object
  def self.grab_book (page)
    title_author = page.css('form#handleBuy')>('div.buying')
    title = title_author.children[1].css('span#btAsinTitle').children[0].text
    author = title_author.children[3].css('a').text

    price = page.css('span.bb_price')[-1].text.strip
    price += " USD"

    isbn_10 = ""
    shipping_weight = 0.0

    page.css('td.bucket').css('.content').css('li').each_with_index do |li, index|
      category = li.css('b').text
      if category.downcase.include?("isbn-10")
        li.css('b').remove
        isbn_10 = li.text.strip
      end
      if category.downcase.include?("weight")
        li.css('b').remove
        shipping_weight = li.text.strip.to_f
      end
    end

    book = Book.new(title, author, price, shipping_weight, isbn_10)
    return book
  end

end