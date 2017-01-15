module Parser

# testing
  def self.scan_dir(directory)
    Dir.foreach("data") do |x|
      if x  =~ /\.html?$/
        puts "Got #{x}"
      end
    end
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

end
