require 'spec_helper.rb'
require 'nokogiri' 
require 'open-uri'

describe DF::WebCrawler do 
  let(:source_1) {'./AllMyBooksArePacked/data/book1.html'}
  let(:source_2) {'http://www.amazon.com/Inquebrantable-Historia-Espanol-Spanish-ebook/dp/B00BHHDNHW/ref=dp_kinw_strp_1'}
  let(:html_source) {DF::WebCrawler.new(source_1)}
  let(:html_source_2) {DF::WebCrawler.new(source_2)}
  
  it 'takes a string as its source for the initialize method' do 
  	page = html_source
  	expect(page.source).to eq('./AllMyBooksArePacked/data/book1.html')
  end

  it 'can load a file from a local directory' do 
  	page = html_source.create_html_object
  	expect(page.class).to eq(Nokogiri::HTML::Document)
  end

  it 'can load a page given a URL' do 
  	page = html_source_2.create_html_object
  	expect(page.class).to eq(Nokogiri::HTML::Document)
  end
end
