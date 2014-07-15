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

  	it 'parses a boxed set appropriately' do 
  	  book_4 = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book4.html')
  	  book_4.parse_title
  	  expect(book_4.title).to eq("Sylvia Day Crossfire Series Boxed Set: Bared to You/Reflected in You/Entwined with You")
  	  expect(book_4.author).to eq("Sylvia Day")
  	end
  end

  describe 'parse_price' do 
  	it "parses out and stores the 'new' price of the book" do
  	  @html_source.parse_price 
  	  expect(@html_source.price).to eq("$15.22")
  	end
  end

  describe 'parse_product_info' do
  	it "parses out and stores the isbn number and weight" do
  	  @html_source.parse_product_info
  	  expect(@html_source.isbn).to eq("0062255657")
  	  # expect(@html_source.weight).to eq(4.1)
  	end 

  	# xit "converts the weight to pounds if it is in ounces" do
  	#   test_book = DF::AmazonCrawler.new("http://www.amazon.com/The-Fault-Stars-John-Green/dp/014242417X/ref=acs_ux_rw_ts_b_books_2?ie=UTF8&s=books&pf_rd_p=1615333102&pf_rd_s=merchandised-search-5&pf_rd_t=101&pf_rd_i=283155&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0N5VGQQP1ZE463F6YJH7") 
  	# end
  end
end
