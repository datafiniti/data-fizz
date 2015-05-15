# Class: Name
#
# Description.
#
# Attributes:
# + @name    - Class: description.
#
# Public Methods:
# + method_name

class Box
  def initialize(box_no)
    @id_number = box_no
  end
  
  def format_info
    box_info = {"id": @id_number,
                "totalWeight": 0,
                "contents": Array.new
                }
                
    return box_info
  end
  
end
