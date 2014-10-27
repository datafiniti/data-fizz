require 'sinatra'
require 'nokogiri'
require 'open-uri'




get '/' do
  @files = Dir.glob("./data_bank/*")
  @dir_url = {}

  @files.each do |file|
    fork do
      # @dir_curl[file] = File.open(file).read
      puts file
    end
  end




  url = "./data_bank/book1.html"
  @data = Nokogiri::HTML(open(url))
  erb :index
end



dir_url = {}
files = Dir.glob("./data_bank/*")

files.each do |file|
  data = Nokogiri::HTML(open(file))
  library[file] = {
    "data_bank_id": data.url[/\d/],
    "title": data.css("a strong")[0].children.text.strip,
    "author": data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/]
    "price": data.css('.bb_price').text.strip


  
  # @book = {}

  # @book['data_bank_id'] = data.url[/\d/]
  # @book['title'] = data.css("a strong")[0].children.text.strip
  # @book['author'] = data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/]
  # @book['price'] = data.css('.bb_price').text.strip
  # @book['shipping_weight'] = data.css('.content ul li[7]').text.strip.split(": ")[1][/\d.\d/]
  # @books['isbn-10'] = data.css("link[rel='canonical']")[0].attributes['href'].value.split("/").last




  # get '/' do
  #   url = "./data_bank/book1.html"
  #   @data = Nokogiri::HTML(open(url))
  #   erb :index
  # end
  # <td><%= @data.url[/\d/] %></td>
  # <td><%= @data.css("a strong")[0].children.text.strip %></td>
  # <td><%= @data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/] %></td>
  # <td><%= @data.css('.bb_price').text.strip %></td>
  # <td><%= @data.css('.content ul li[7]').text.strip.split(": ")[1][/\d.\d/] %></td>
  # <td><%= @data.css("link[rel='canonical']")[0].attributes['href'].value.split("/").last %></td>
