require_relative 'crawler'

class Book < Crawler 
attr_reader :title, :author, :price, :isbn, :shipping_weight 
	def initialize(params = {})
	 @params = params
	 @title = @params[:title]
	 @author = @params[:author]
	 @price = @params[:price]	
	 @isbn = @params[:isbn]	
	 @shipping_weight = @params[:shipping_weight]		
 	 return @params
	end

	def hashifier
		parameters = Array.new
		self.params.each do |param|
			parameters << Hash[*param]
		end
		return parameters
	end

end
