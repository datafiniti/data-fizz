require 'nokogiri'
require_relative 'parser.rb'

class AmazonParser < Parser
  def initialize(directory = 'lib/data/')
    super(directory)
    @parse_document = Proc.new do |doc_file|
        doc = Nokogiri::HTML(doc_file)
        parsed_data = {}
        [:title, :author, :price, :shipping_weight, :isbn_10].each do |attr|
          parsed_data[attr] = send("parse_#{attr}", doc)
        end
        Book.find_or_create_by(parsed_data)
    end
  end

  def run
    open_html_files &@parse_document
  end

  def parse_title(doc)
    # use defensive parsing in each method to prevent errors
    # run test suite to ensure parsing is still working correctly
    title_container = doc.css('#btAsinTitle').first
    title_container.inner_text.strip if title_container
  end

  def parse_author(doc)
    author_label = doc.xpath('//*[contains(text(), "Author")]').first
    author_label.previous.previous.inner_text.strip if author_label
  end

  def parse_price(doc)
    price = doc.css('.priceLarge')
    price = price.inner_text if price

    if price.length > 0 && price =~ /$/
      # re-write to potentially incorporate conversion from other currencies
      convert_to_usd(price)
    else
      #alternate price location
      price = doc.css('td.price')
      convert_to_usd(price.inner_text.strip)
    end
  end

  def parse_shipping_weight(doc)
    shipping_weight = doc.xpath('//*[contains(text(), "Weight")]').first

    if shipping_weight.next_sibling
      shipping_weight = shipping_weight.next_sibling.inner_text
    end

    convert_to_pounds(shipping_weight)
  end

  def parse_isbn_10(doc)
    isbn_label = doc.xpath('//*[contains(text(), "ISBN-10")]').first
    isbn_label = isbn_label.next_sibling if isbn_label
    isbn_label.inner_text.strip if isbn_label
  end
end
