require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'pry-debugger'
require_relative './lib/df.rb'

set :bind, '0.0.0.0'
set :environment, :development

get '/shipping-boxes' do
  result = DF::GetBooksShippingBoxes.run
  content_type :json
  result.to_json
end
