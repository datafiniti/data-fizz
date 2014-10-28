require 'sinatra'
require 'nokogiri'
require 'open-uri'

get '/' do
  @library = {}
  @files = Dir.glob("./data_bank/*")

  @files.each do |file|
    data = Nokogiri::HTML(open(file))
    @library[file] = {
      :data_bank_id => data.url[/\d+/].rjust(2,"0"),
      :title => data.css('#btAsinTitle').text.strip, # => .gsub(/\[.*\]/,''),
      :author => data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/],
      :price => data.css('.bb_price').text.strip,
      :shipping_weight => data.css('.content ul li[7]').text.strip.split(": ")[1][/\d.\d/],
      :isbn_10 => data.css("link[rel='canonical']")[0].attributes['href'].value.split("/").last
    }
  end

  puts @library

  erb :index
end


  
  # @book = {}

  # @book['data_bank_id'] = data.url[/\d/]
  # @book['title'] = data.css("a strong")[0].children.text.strip
  # @book['author'] = data.css("meta[name='description']")[0].attributes["content"].value[/(?<=\[)[^\]]+(?=\])/]
  # @book['price'] = data.css('.bb_price').text.strip
  # @book['shipping_weight'] = data.css('.content ul li[7]').text.strip.split(": ")[1][/\d.\d/]
  # @books['isbn_10'] = data.css("link[rel='canonical']")[0].attributes['href'].value.split("/").last

# <% @library.each do |book, content| %>


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
