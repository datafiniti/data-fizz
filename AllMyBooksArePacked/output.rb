Dir["lib/data/*.rb"].each {|file| require file }
require_relative 'lib/objects/boxer'
require_relative 'lib/objects/crawler'
require_relative 'lib/objects/GrabPage'

class Output < Boxer 

	def self.pages 
		pages = Array.new 
		num = 1
		until num == 20 do 
			pages.push("lib/data/book#{num}.html")
			num += 1
		end
	return pages
	end
		
	def self.gather_books(pages)
		books = Array.new 
		pages.each do |page|
			crawler = Crawler.new(page).book_attr 
			book = Book.new(crawler)
			books << book
		end
		box = Boxer.new.book_boxer(books)
	end

	def self.json_books(boxes)
		output = Array.new
		boxes.each do |box|
		package = Array.new
		json_format = Array.new
		box.books.each do |format|
			format = format.hashifier	
			json_format.insert(-1,JSON.pretty_generate(format))
		end
		package.push(['Box','id'"#{box.id}",'total weight:'"#{box.weight}",json_format])
			output << (package)
		end
		return output
	end


	def self.print_json(boxes)
		boxes.each do |box|
			unless box.class == Array	
				line = box.split("\n")
			else line = box
				separator = "\n"	
				File.open("./output.json","a") do |f|
					 f.write(line)
					 f.write(separator)
					 f.close
				end
			end
		end
	end

			print_json(json_books(gather_books(pages)))
	end
