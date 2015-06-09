class Parser
  def initialize(relative_directory = './data/')
    @relative_directory = relative_directory
    @parse_document = block if block_given?
  end

  def open_html_files
    Dir.glob("#{@relative_directory}*.html") do |file_str|
      yield(File.open(file_str)) if block_given?
    end
  end
end
