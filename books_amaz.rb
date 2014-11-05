require 'sinatra'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'pry-byebug'
require_relative 'lib/package.rb'

get '/' do
  @library = {}
  @files = Dir.glob("./data_bank/*")

  @files.each do |file|
    data = Nokogiri::HTML(open(file))
    @library[file] = {
      :data_bank_id => data.url[/\d+/].rjust(2,"0"),
      :title => data.css('#btAsinTitle').text.strip.gsub(/\[.*\]/,''),
      :author => data.css("meta[name='description']")[0]
        .attributes["content"].value[/(?<=\[)[^\]]+(?=\])/],
      :price => data.css('.bb_price').text.strip,
      :shipping_weight => data.css('.content ul li:contains("Shipping Weight")')
        .text.strip.split(": ")[1][/\d.\d/],
      :'isbn-10' => data.css("link[rel='canonical']")[0].attributes['href']
        .value.split("/").last
    }
    
    # Set price to the Buy New price only if Buy Used or Rent prices are shown
    if @library[file][:price][/\s/]
      @library[file][:price] = data.css('.bb_price').text.strip.split(" ").last
    end
  end

  # puts @library
  # puts "-----------"
  # puts "JSON: "
  # puts @library.to_json

  erb :index
end

get '/packaging' do

  puts @library

  erb :packaging
end

# get '/' do
#   url = "./data_bank/book1.html"
#   @data = Nokogiri::HTML(open(url))
#   erb :index
# end
