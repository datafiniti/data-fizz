require 'pry'
require 'json'

# Module: JsonHelper
#
# Toolbox for parsing and writing JSON.
#
# Public Methods:
# + write_files

module JsonHelper
  
  # Public: .box_products
  # Formats Array representing "Boxes" containing "Products" as indented JSON; writes to file in parent directory.
  #
  # Parameters:
  # + boxes_array  : Array of Hashes
  #
  # Returns:
  # None.
  #
  # State Changes:
  # Creates and writes .json file.
  
  def self.write_file(boxes_array)
    boxes_json = JSON.pretty_generate(boxes_array)

    json_doc = File.new("boxed_products.json", "w")
    json_doc.puts(boxes_json)
    json_doc.close
  end
end
