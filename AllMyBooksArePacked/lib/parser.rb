require 'nokogiri'

def open_html_files(relative_directory)
  Dir.glob("./#{relative_directory}/*.html") do |file_str|
    yield(File.open(file_str))
  end
end

def parse_title(doc)
  title_container = doc.css('#btAsinTitle').first
  title_container.inner_text.strip
end

def parse_author(doc)
  author_label = doc.xpath('//*[contains(text(), "Author")]').first
  if author_label
    author_label.previous.previous.inner_text.strip
  end
end

def parse_shipping_weight(doc)
  shipping_weight = doc.xpath('//*[contains(text(), "Weight")]').first.next_sibling.inner_text
  # option to parse other weight units in the future
  if shipping_weight =~ /pounds/
    shipping_weight.gsub(/[^\d\.]/,'')
  end
end

def parse_isbn_10(doc)
  isbn_label = doc.xpath('//*[contains(text(), "ISBN-10")]').first.next_sibling
  isbn_label.inner_text.strip
end

def parse_price(doc)
  doc.css('.priceLarge').inner_text
end

# def parse
parse_doc = Proc.new do |doc_file|
    doc = Nokogiri::HTML(doc_file)
    parse_isbn_10(doc)
    parse_title(doc)
    parse_author(doc)
    parse_price(doc)
    parse_shipping_weight(doc)
end
dir = 'AllMyBooksArePacked/data'
open_html_files(dir, &parse_doc)
