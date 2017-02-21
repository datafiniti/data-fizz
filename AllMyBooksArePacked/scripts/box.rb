# Class: Box
#
# Builds Box container to store representations of Product objects.
#
# Attributes:
# + @id_number    - Integer: Binning iterator used in BoxHelper.
#
# Public Methods:
# + format_info

class Box
  
  def initialize(box_no)
    @id_number = box_no
  end # method
  
  # Public: #format_info
  # Returns representation of the Object's instance, formatted properly for eventual conversion to JSON.
  #
  # Parameters:
  # None.
  #
  # Returns:
  # Hash.
  #
  # State Changes:
  # None.
  
  def format_info
    box_info = {"id": @id_number,
                "totalWeight": 0,
                "contents": Array.new
                }
                
    return box_info
  end # method
  
end # class
