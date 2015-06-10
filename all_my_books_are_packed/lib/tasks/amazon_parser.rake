require './lib/parsers/amazon_parser.rb'
require './lib/box_packer.rb'

namespace :scrape_and_box do
  desc "Scrape for books in a directory and pack them into boxes"
  task :amazon => :environment do
    t1 = Time.now
    # Parser takes directory (relative to app root)
    # as optional argument on instantiation; defaults to './lib/data'
    AmazonParser.new.run
    #parser touches every book it scrapes
    books = Book.where('updated_at > ?', t1).order(shipping_weight: :desc).to_a
    # in a real app we wouldn't destroy all the boxes
    # but rather specify which specific books should be boxed
    # and when we serve the JSON specify which boxes belong to a shipment;
    # all of this would depend on the purpose of this app
    Box.destroy_all
    #BoxPacker takes  max box capacity as optional second argument
    BoxPacker.new(books).best_fit
  end
end
