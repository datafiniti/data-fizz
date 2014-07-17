require 'sinatra'
require 'sinatra/reloader'
require 'json'
require_relative './lib/df.rb'

set :bind, '0.0.0.0'
# set :environment, :development

get '/shipping-boxes' do
  @node_id = params[:id]
  result = DF::GetBooksShippingBoxes.run
  content_type :json
  result.to_json
end
