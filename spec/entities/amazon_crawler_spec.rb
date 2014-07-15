require 'spec_helper.rb'
require 'nokogiri' 
require 'open-uri'

describe DF::AmazonCrawler do 
  let(:source_1) {'./AllMyBooksArePacked/data/book10.html'}
  let(:html_source) {DF::WebCrawler.new(source_1)}

  it 'inherits the initialize method from the WebCrawler parent' do 
  	page = html_source
  	expect(page.source).to eq('./AllMyBooksArePacked/data/book10.html')
  end

  it 'inherits the create a HTML Doc object method from WebCrawler parent' do 
  	page = html_source.create_html_object
  	expect(page.class).to eq(Nokogiri::HTML::Document)
  end
end