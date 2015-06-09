require 'nokogiri'
require_relative 'parser.rb'

class AmazonParser < Parser
  def initialize
    super
    @parse_document = Proc.new do |doc_file|
        doc = Nokogiri::HTML(doc_file)
        # use defensive parsing to prevent errors
        p parse_title(doc)
        p parse_author(doc)
        p parse_price(doc)
        p parse_shipping_weight(doc)
        p parse_isbn_10(doc)
    end
  end

  def run
    open_html_files &@parse_document
  end

  def parse_title(doc)
    title_container = doc.css('#btAsinTitle').first
    if title_container
      return title_container.inner_text.strip
    end
    nil
  end

  def parse_author(doc)
    author_label = doc.xpath('//*[contains(text(), "Author")]').first
    if author_label
      return author_label.previous.previous.inner_text.strip
    end

    nil
  end

  def parse_price(doc)
    price = doc.css('.priceLarge')
    price = price.inner_text if price
    return price if price.length > 0

    price = doc.css('td.price')
    return price.inner_text.strip if price

    nil
  end

  def parse_shipping_weight(doc)
    shipping_weight = doc.xpath('//*[contains(text(), "Weight")]').first

    if shipping_weight.next_sibling
      shipping_weight = shipping_weight.next_sibling.inner_text
    end

    # option to parse other weight units in the future
    if shipping_weight =~ /pounds/
      return shipping_weight.gsub(/[^\d\.]/,'')
    end
    nil
  end

  def parse_isbn_10(doc)
    isbn_label = doc.xpath('//*[contains(text(), "ISBN-10")]').first
    isbn_label = isbn_label.next_sibling if isbn_label
    return isbn_label.inner_text.strip if isbn_label
    nil
  end
end

AmazonParser.new.run
