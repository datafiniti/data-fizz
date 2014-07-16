require 'active_record'
require 'pry'

module DF
  ActiveSupport::Inflector.inflections(:en) do |inflect|
    inflect.uncountable 'book_product_information'
  end

  class ActiveRecordDatabase
    def initialize
      config_path = File.expand_path('../../../db/config.yml', __FILE__)
      config = YAML.load_file(config_path)
      app_env = ENV['DB_ENV'] || 'test'
      ActiveRecord::Base.establish_connection(config[app_env])
    end

    class BookProductInformation < ActiveRecord::Base
    end

    def create_book_product(attrs)
      BookProductInformation.create(attrs)
    end

    def clear_tables
      BookProductInformation.delete_all
    end
  end
end