require 'spec_helper.rb'
require 'crawler.rb'

describe '#grab_data' do 
	context 'when file is grabbed' do 
		it 'should be a Nokogiri object' do
			crawler = Crawler.new
		 	nokogiri_file = crawler.grab_data(arg)
			expect(nokogiri_file).to match( an_instance_of(Nokogiri))
		end
	end
end
