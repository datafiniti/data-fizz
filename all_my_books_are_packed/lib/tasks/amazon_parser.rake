require_relative 'amazon_parser.rb'
require_relative 'box_packer.rb'

namespace :books do
  namespace :amazon do
    task :scrape_and_ship => :environment do
      t1 = Time.now
      AmazonParser.new.run
      books = Book.where('updated_at > ?', t1).order(shipping_weight: :desc).to_a
      results = BoxPacker.new(books).best_fit

      File.open('test.txt', 'w') do |f|
        f.write(results)
      end

    end
  end
end
