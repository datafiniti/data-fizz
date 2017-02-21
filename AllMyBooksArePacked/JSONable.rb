# William Hudgins
# Datafiniti Coding Challenge
# JSONable.rb
# 07/01/15
#
# Provides a module which serializes objects to JSON

module JSONable
  def json_encode
    result = '{"class": "' << self.class.name << '"'  
    self.instance_variables.each do |var|
      result << ', "' << var.to_s.delete("@") << '": '
      result << encode(self.instance_variable_get(var))
    end
    
    result << '}'
    return result
  end
  
    private def encode(object) 
      if (object.respond_to? :json_encode)
        result = object.json_encode
      elsif (object.kind_of?(Enumerable))
        temp = Array.new
        result = "["
        object.each_entry do |element|
          temp.push(encode(element))
        end
        result << temp.join(", ") << "]"
      else
        result = '"' << object.to_s << '"'
        result = object.is_a?(Numeric) ? result[1..-2] : result
      end
     return result
   end
end
