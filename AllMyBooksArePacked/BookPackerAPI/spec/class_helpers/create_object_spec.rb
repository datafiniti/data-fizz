require 'spec_helper.rb'
require_relative '../../app/class_helpers/web_scrapinizor'
require_relative '../../app/class_helpers/book_parser'
require_relative '../../app/class_helpers/create_object'


RSpec.describe Create::AmazonBook do

  let(:scrape) {Scrape::AmazonBook.new("./../data/book1.html").nokogiri_scrape}
  let(:book_info) {Parser::AmazonBookParser.new(scrape)}
  let(:book) {Create::AmazonBook.new(book_info)}
  let(:warehouse_guy) {Create::BookPackagePacker.new}

  describe 'Create::AmazonBook class' do

    it "creation method returns true" do
      expect(book).to be_truthy
    end


  end

end