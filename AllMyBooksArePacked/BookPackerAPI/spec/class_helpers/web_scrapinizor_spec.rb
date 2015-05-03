require 'spec_helper.rb'
require_relative '../../app/class_helpers/web_scrapinizor'


RSpec.describe Scrape::AmazonBook do

let(:scraper) {Scrape::AmazonBook.new("./../data/book1.html")}

  before :each do
    @noko_scrape = scraper.nokogiri_scrape
  end


  it "doesn't come back nil" do
    expect(@noko_scrape).not_to eql(nil)
  end

  it "doesn't respond with a nokogiri error html and scrapes amazon page" do
    expect(@noko_scrape.to_s).to include("Amazon")
  end

  it "scrapes a Nokogiri document / object" do
    expect(@noko_scrape.class).to eq(Nokogiri::HTML::Document)
  end

end