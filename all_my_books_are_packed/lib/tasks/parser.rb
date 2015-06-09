class Parser
  def initialize(directory = './../data/', &block)
    @directory = directory
    @parse_document = block if block_given?
  end

  def open_html_files
    Dir.glob("#{@directory}*.html") do |file_str|
      yield(File.open(file_str)) if block_given?
    end
  end

  def convert_to_usd(price)
    if price =~ /$/
      #remove non-digit/decimal-separator characters
      price.gsub(/[^\d\.]/,'')
    else #elsif [other currencies]
      #convert to USD for database storage before removing chars
    end
  end

  def convert_to_pounds(weight)
    if weight =~ /pounds/
      #remove non-digit/decimal-separator characters
      weight.gsub(/[^\d\.]/,'')
    else #elsif [other currencies]
      #convert to pounds for database storage before removing chars
    end
  end
end
