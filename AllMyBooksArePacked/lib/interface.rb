require_relative './amazon.rb'
require 'nokogiri'
require 'open-uri'

module BoxPacker
  class Interface

    def self.read_html_files_from(folder)
      library = []
      Dir.foreach("../#{folder}") do |file|
        if file.end_with?(".html")
          library.push(BoxPacker::Amazon::Processor.get_book_info(:file, Nokogiri::HTML(open("../#{folder}/#{file}"))))
        end
      end
      return library
    end

    def self.read_pages_from(*websites)
      library = []
      websites.each do |page|
        page_open = open(page)
        library.push(BoxPacker::Amazon::Processor.get_book_info(:web, Nokogiri::HTML(page_open)))
      end
      return library
    end

  end
end