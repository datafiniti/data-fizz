require 'nokogiri'
require 'json'
box = {
	id: 1,
	totalWeight: 0.0,
	contents: []
}
for i in 1..20 do
	file = File.open("./Books/Book#{i}.html")
	html = Nokogiri::HTML(file)

	title = html.at_css('#btAsinTitle').text
	author = html.at_css('.buying span a').text
	weight = html.at_css('.content ul li[7]').text.gsub(/[^0-9_.-]/,'').to_f.round(1)
	isbn = html.at_css('.content ul li[4]').text

	if i == 9
		rent_price = html.at_css('.rentPrice').text
		book = {
			title: title,
			author: author,
			price: rent_price,
			weight: weight,
			isbn: isbn
		}
		box.merge!(contents: book)
	elsif i == 12
		price = html.at_css('.priceLarge').text
		weight = html.at_css('.content ul li[8]').text.gsub(/[^0-9_.-]/,'').to_f
		book = {
			title: title,
			author: author,
			price: price,
			weight: weight,
			isbn: isbn
		}
		box.merge!(contents: book)
		box.merge!(totalWeight: weight)
	elsif i == 20
		price = html.at_css('.priceLarge').text
		weight = html.at_css('.content ul li[6]').text.gsub(/[^0-9_.-]/,'').to_f
		book = {
			title: title,
			author: author,
			price: price,
			weight: weight,
			isbn: isbn
		}
		box.merge!(contents: book)
		box.merge!(totalWeight: weight)
	else
		price = html.at_css('.priceLarge').text
		book = {
			title: title,
			author: author,
			price: price,
			weight: weight,
			isbn: isbn
		}
		box.merge!(contents: book)
	end
	if box[:totalWeight] == 0.0
		box[:totalWeight] = weight
	elsif (box[:totalWeight] + weight) < 10.0
		box[:totalWeight] += weight
		box[:contents].store([:contents], box[:contents])
	else 
		box[:id] = (box[:id] + 1)			
		box[:totalWeight] = weight
	end
	puts box
	# order = File.open("order.rb", "a")
	# order.puts box.to_json
	# order.close   
end
