module DF
  def self.db
    @__db_instance ||= ActiveRecordDatabase.new
  end
end

require_relative './entities/web_crawler.rb'
require_relative './entities/amazon_crawler.rb'
require_relative './database/ar_database.rb'
require_relative './use_cases/command_class.rb'
require_relative './use_cases/add_book_to_db.rb'
require_relative './use_cases/show_shipping_boxes.rb'
