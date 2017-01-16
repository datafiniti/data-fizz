module Parser

  def self.parse_dir(directory)
    Dir.foreach(directory) do |x|
      if x =~ /\.html?$/
        process_file("#{directory}/#{x}")
      end
    end
  end

  def self.process_file(file)
    opened = open_file(file)
    cleaned = clean_file(opened)
    parsed = noko_parse(cleaned)
    parsed
    # Need to find attrs of book in docs
    # save in database as separate entries
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

  def self.grab_weight(file)
    file.css('#productDetailsTable ul li')[6].text.slice(/\d.\d?/)
  end

end
