# William Hudgins
# Datafiniti Coding Challenge
# processAmazonBooks.rb
# 07/01/15
#
# Extracts data about N books from Amazon book pages and distributes those N
#  books into M x pound boxes.
# Requires the Book, Box, Extractor, Packer, and PackableItem classes. 

# Require the necessary files once
require 'json'
require_relative 'Book'
require_relative 'Extractor'
require_relative 'Box'
require_relative 'Packer'
require_relative 'PackableItem'

# Predefined constants
DIRECTORY = "data"
BOX_CAPACITY = 10

# Extract data from the specified directory
extractor = Extractor.new(DIRECTORY)
book = extractor.extract_book_info

# Pack the books into M boxes
packer = Packer.new(BOX_CAPACITY);
packer.pack_items(book);
box = packer.box;

# Output results in a readable form
json_output = "["
box.each do |current_box|
  json_output << current_box.json_encode << ", "
end
# -2 to remove trailing ', '
json_output = json_output[0..-3] << "]"

puts JSON.pretty_generate(JSON.parse(json_output))
