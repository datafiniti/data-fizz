# Class: Product
#
# Builds product Object with scraped attributes.
#
# Attributes:
# + @weight    - Float: Weight of product; kept as float in order to calculate Box weight.
# + @title     - String: Title of product, in this case a book.
# + @author    - String: Author of book.
# + @price     - String: Price of product.
# + @isbn      - String: ISBN of book.
#
# Public Methods:
# + format_info

class Product
  
  def initialize(options={})
    @weight = options[:weight]
    @title = options[:title]
    @author = options[:author]
    @price = options[:price]
    @isbn = options[:isbn]
  end # method
          
  # Public: #format_info
  # Returns representation of the Object's instance, formatted properly for eventual conversion to JSON.
  #
  # Parameters:
  # None.
  #
  # Returns:
  # Array: Array containing two Hashes, one with weight and one with formatted product info.
  #
  # State Changes:
  # None.
          
  def format_info
    info = [{weight: @weight},
            { "title": @title,
              "author": @author,
              "price": @price + " USD",
              "shipping_weight": @weight.to_s + " pounds",
              "isbn-10": @isbn
              }]
    return info
  end # method
  
end # class
