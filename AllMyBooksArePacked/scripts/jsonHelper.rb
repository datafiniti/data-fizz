require 'pry'
require 'json'

module JsonHelper
  def self.write_file(boxes_hash)
    boxes_json = JSON.pretty_generate(boxes_hash)

    json_doc = File.new("boxed_products.json", "w")
    json_doc.puts(boxes_json)
    json_doc.close
  end
end
