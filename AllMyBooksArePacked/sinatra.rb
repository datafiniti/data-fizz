require 'sinatra'
require 'json'
require_relative './lib/parse_pages.rb'

set :bind, '0.0.0.0'
set :environment, :production

get '/' do
  all_books = []
  20.times do |i|
    all_books << ParsePages::Book.new("book#{i+1}.html")
  end
  result = ParsePages::Ship.new.run(all_books, 10)
  content_type :json
  JSON.pretty_generate result
end
