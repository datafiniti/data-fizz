module Parser

  def self.parse_dir(directory)
    Dir.foreach(directory) do |x|
      if x  =~ /\.html?$/
        process_file("#{directory}/#{x}")
      end
    end
  end

  def self.open_file(file)
    opened = File.read("#{file}")
  end

  def self.clean_file(file)
    HTMLWhitespaceCleaner.clean(file)
  end

  def self.noko_parse(file)
    Nokogiri.parse(file)
  end

end
