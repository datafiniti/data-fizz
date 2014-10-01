weight_split = 10

 

array = []
while array.length < 20
  array.push((0.5..9.5).step(0.1).to_a.sample)
end

# array = [
#   9.4,
#   8.8,
#   7.8,
#   1.4,
#   7.6,
#   2.2,
#   6.4,
#   2.6,
#   5.6,
#   2.8,
#   1.2,
#   4.9,
#   3.2,
#   1.4,
#   4.4,
#   3.6,
#   1.4,
#   4.1,
#   3.6,
#   2.2
# ]

puts "array --> #{array}"

sum = array.inject(:+)
puts "sum --> #{sum}"

average = sum/array.length
puts "average --> #{average}"

parts = ((sum)/weight_split).ceil
puts "parts --> #{parts}"

splits = Array.new(parts) {[]}
totals = Array.new(parts) {0}

array.sort!
# puts "sorted array --> #{array}"

while (array.length != 0)
  element = array.pop
  lightest_totals_index = 0
  lightest_totals_amount = totals[0]

  totals.each_with_index do |total, index|
    next if index === 0
    if total < lightest_totals_amount 
      lightest_totals_index = index
      lightest_totals_amount = totals[index]
    end
  end

  splits[lightest_totals_index].push(element)
  totals[lightest_totals_index] = splits[lightest_totals_index].inject(:+)
end


totals.each_with_index do |total, index|
  puts "--part #{index+1} with total of #{total}--"
  puts splits[index]
end

