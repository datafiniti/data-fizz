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
      app_env = ENV['DB_ENV'] || 'development'
      ActiveRecord::Base.establish_connection(config[app_env])
    end

    class BookProductInformation < ActiveRecord::Base
      belongs_to :shipping_box
    end

    class ShippingBox < ActiveRecord::Base
      has_many :book_product_information
    end

    def create_book_product(attrs)
      BookProductInformation.create(attrs)
    end

    def get_books_in_box(box_id)
      BookProductInformation.where("shipping_boxes_id = ?", box_id)
    end

    def create_shipping_box(attrs)
      ShippingBox.create(attrs)
    end

    def update_shipping_box_weight(id, weight)
      ar_box = ShippingBox.find(id)
      ar_box.update(weight)
      ar_box
    end

    def get_box_by_weight(weight)
      ShippingBox.where("total_weight <= ?", weight).first
    end

    def get_all_shipping_boxes
      ShippingBox.all.order(:id)
    end

    # Testing helper method
    def clear_tables
      BookProductInformation.delete_all
      ShippingBox.delete_all
    end
  end
end