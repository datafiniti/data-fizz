module Parser

  def self.parse_dir(directory)
    Dir.foreach(directory) do |x|
      if x =~ /\.html?$/
        process_file("#{directory}/#{x}")
      end
    end
  end

  def self.process_file(file)
    # parse individual html file
    opened = open_file(file)
    cleaned = clean_file(opened)
    parsed = noko_parse(cleaned)
    # save to database
    book = Book.new
    book.title = grab_title(parsed)
    book.author = grab_author(parsed)
    book.price_dollars = grab_price(parsed)
    book.weight_lbs = grab_weight(parsed)
    book.isbn = grab_isbn(parsed)
    book.save
  end

  def self.open_file(file)
    File.read("#{file}")
  end

  def self.clean_file(file)
    HTMLWhitespaceCleaner.clean(file)
  end

  def self.noko_parse(file)
    Nokogiri.parse(file)
  end

  def self.grab_weight(parsed_file)
    parsed_file.css('#productDetailsTable ul li')[6].text.slice(/\d.\d?/)
  end

  def self.grab_isbn(parsed_file)
    parsed_file.css('#productDetailsTable ul li')[3].text.slice(/(?<=: ).+/)
  end

  def self.grab_title(parsed_file)
    parsed_file.css('#btAsinTitle').text.split(' [')[0]
  end

  def self.grab_author(parsed_file)
    parsed_file.css('.buying > span > a').text
  end

  def self.grab_price(parsed_file)
    parsed_file.css('#actualPriceValue').text.delete('$')
  end

end
