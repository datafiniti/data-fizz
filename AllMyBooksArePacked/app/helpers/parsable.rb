module Parser

  def self.open_file(file)
    File.read("#{file}")
  end

  def self.clean_file(file)
    HTMLWhitespaceCleaner.clean(file)
  end

  def self.noko_parse(file)
    Nokogiri.parse(file)
  end

end
