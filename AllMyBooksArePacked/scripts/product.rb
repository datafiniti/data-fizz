# Class: Name
#
# Description.
#
# Attributes:
# + @name    - Class: description.
#
# Public Methods:
# + method_name

class Product
  def initialize(options={})
    @weight = options[:weight]
    @title = options[:title]
    @author = options[:author]
    @price = options[:price]
    @isbn = options[:isbn]
  end
          
  def format_info
    info = [{weight: @weight},
            { "title": @title,
              "author": @author,
              "price": @price + " USD",
              "shipping_weight": @weight.to_s + " pounds",
              "isbn-10": @isbn
              }]
    return info
  end
  
end
