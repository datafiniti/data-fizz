require 'spec_helper.rb'
require 'nokogiri' 
require 'open-uri'

describe DF::AmazonCrawler do 
  before(:each) do 
  	@html_source = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book10.html')
  end
  
  describe 'initialize' do 
  	it 'inherits the initialize method from the BooksCrawler parent' do 
  	  expect(@html_source.source).to eq('./AllMyBooksArePacked/data/book10.html')
    end

    it 'initializes with a page attribute that is set to the Nokogiri HTML object' do
      expect(@html_source.page.class).to eq(Nokogiri::HTML::Document)
    end
  end

  describe 'parse_book_title' do 
  	it "parses out and returns the title of a book" do 
  	  expect(@html_source.parse_book_title).to eq("The Ocean at the End of the Lane: A Novel [Deckle Edge] [Hardcover]")
  	end

  	it 'parses a boxed set appropriately' do 
  	  book_4 = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book4.html')
  	  expect(book_4.parse_book_title).to eq("Sylvia Day Crossfire Series Boxed Set: Bared to You/Reflected in You/Entwined with You [Paperback]")
  	end

    it 'returns nil if the inputted html or URL does not have the recognized title format' do 
      test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
      expect(test.parse_book_title).to eq(nil)
    end
  end

  describe 'parse_book_author' do 
    it "parses out and returns the author of a book" do 
      expect(@html_source.parse_book_author).to eq("Neil Gaiman")
    end

    it 'parses for multiple authors' do 
      test = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book18.html')
      result = test.parse_book_author
      expect(test.parse_book_author).to eq("Robert Galbraith, J.K. Rowling")
    end

    it 'returns nil if the inputted html or URL does not have the recognized title format' do 
      test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
      expect(test.parse_book_author).to eq(nil)
    end
  end

  describe 'parse_book_price' do 
    it "parses out and returns the 'new' price of the book" do 
  	  expect(@html_source.parse_book_price).to eq("$15.22 USD")
  	end

    it 'parses large prices (with commas)' do 
      test = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book11.html')
      expect(test.parse_book_price).to eq("$7,450.00 USD")
    end
    # Most, if not all, Amazon products have prices formatted in same manner, so this will always return a price
  end

  describe 'parse_book_isbn' do
  	it "parses out and stores the isbn number and weight" do
  	  expect(@html_source.parse_book_isbn).to eq("0062255657")
    end 

    it 'returns nil if the inputted html or URL does not have the recognized isbn format' do 
      test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
      expect(test.parse_book_isbn).to eq(nil)
    end
  end

  describe 'parse_book_weight' do 
    it 'parses out and stores the shipping weight' do
  	  expect(@html_source.parse_book_weight).to eq("4.1 pounds")
    end

  	it "converts the weight to pounds if it is in ounces" do
  	  test_book = DF::AmazonCrawler.new("http://www.amazon.com/The-Fault-Stars-John-Green/dp/014242417X/ref=acs_ux_rw_ts_b_books_2?ie=UTF8&s=books&pf_rd_p=1615333102&pf_rd_s=merchandised-search-5&pf_rd_t=101&pf_rd_i=283155&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=0N5VGQQP1ZE463F6YJH7") 
  	  expect(test_book.parse_book_weight).to eq("0.7125 pounds")
  	end

    it 'returns nil if the inputted html or URL does not have the recognized shipping weight format' do 
      test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
      expect(test.parse_book_weight).to eq(nil)
    end
  end
end
