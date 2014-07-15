require 'spec_helper.rb'
require 'nokogiri' 
require 'open-uri'

describe DF::AmazonCrawler do 
  before(:each) do 
    source_1 = './AllMyBooksArePacked/data/book10.html'
  	@html_source = DF::AmazonCrawler.new(source_1)
  end
  
  describe 'initialize' do 
  	it 'inherits the initialize method from the WebCrawler parent' do 
  	  expect(@html_source.source).to eq('./AllMyBooksArePacked/data/book10.html')
    end

    it 'initializes with a page attribute that is set to the Nokogiri HTML object' do
      expect(@html_source.page.class).to eq(Nokogiri::HTML::Document)
    end
 
    it 'initializes with nil values for author, title, price, weight, and isbn' do 
      expect(@html_source.title).to eq(nil)
      expect(@html_source.author).to eq(nil)
      expect(@html_source.isbn).to eq(nil)
      expect(@html_source.price).to eq(nil)
      expect(@html_source.weight).to eq(nil)
    end
  end

  describe 'parse_title' do 
  	it "parses out the title and author of a book, storing them as instance variables" do 
  	  @html_source.parse_title
  	  expect(@html_source.title).to eq("The Ocean at the End of the Lane: A Novel")
  	  expect(@html_source.author).to eq("Neil Gaiman")
  	end
  end
end
