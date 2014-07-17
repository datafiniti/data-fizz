require 'spec_helper'

describe DF::AddBookToDatabase do
  let(:db) {DF.db}
  
  it "adds a book's title, author, price, shipping weight, and isbn10 to the database" do
  	book = DF::AmazonCrawler.new('./AllMyBooksArePacked/data/book5.html')
  	result = subject.run(book)
  	expect(result.success?).to eq(true)
  	expect(result.book.title).to eq("The English Girl: A Novel (Gabriel Allon) [Hardcover]")
  end

  it 'returns an error if improper information is gathered from the book' do 
  	test = DF::AmazonCrawler.new('http://www.amazon.com/Runaway-Bride-Joan-Cusack/dp/B00AEBB8NS/ref=sr_1_1?s=movies-tv&ie=UTF8&qid=1405527733&sr=1-1&keywords=runaway+bride')
 	result = subject.run(test)
 	expect(result.success?).to eq(false)
 	expect(result.error).to eq("Improper information.")
  end
end