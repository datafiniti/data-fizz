require 'sinatra'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry-byebug'
require_relative './lib/package.rb'


before do
  @library = {}
  @files = Dir.glob("./data/*")

  @files.each do |file|
    data = Nokogiri::HTML(open(file))
    @library[file] = {
      :data_bank_id => data.url[/\d+/].rjust(2,"0"),
      :title => data.css('#btAsinTitle').text.strip.gsub(/\[.*\]/,''),
      :author => data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/],
      :price => data.css('.bb_price').text.strip,
      :shipping_weight => data.css('.content ul li:contains("Shipping Weight")').text.strip.split(": ")[1][/\d.\d/],
      :'isbn-10' => data.css("link[rel='canonical']")[0].attributes['href'].value.split("/").last
    }
    
    # Set price to the Buy New price only if Buy Used or Rent prices are shown
    if @library[file][:price][/\s/]
      @library[file][:price] = data.css('.bb_price').text.strip.split(" ").last
    end
  end
end

get '/' do

  puts @library
  puts @library.to_json


# Attempt at packaging into a 'to_json' parsing method
  # @boxes = {}
  # @library.each do |book, content|
  #   @boxes[book] = [
  #     :id => content[:data_bank_id],
  #     :total_weight => "xxxxxxx",
  #     :contents => {
  #       :title => content[:title],
  #       :author => content[:author],
  #       :price => content[:price],
  #       :shipping_weight => content[:shipping_weight],
  #       :'isbn-10' => content[:'isbn-10']
  #     }
  #   ]
  # end

  erb :index
end

get '/packaging' do
  # Decrease sort for First-Fit Decreasing algorithm for bin packing
  # Need to put into boxes to show the box contents
  @library = @library.sort_by{ |book, content| content[:shipping_weight]}.reverse
  erb :packaging
end

# get '/' do
#   url = "./data/book1.html"
#   @data = Nokogiri::HTML(open(url))
#   erb :index
# end
