class ParsePages::Ship

  def run(items, max_weight)
    total_weight = 0
    num_boxes = 1
    bins = []
    items.each do |item|
      total_weight += item.weight
    end

    if total_weight < max_weight
      bin = ParsePages::Bin.new
      items.each do |item|
        bin.add_content(item)
      end
      bins << bin
    else
      # # Determine number of boxes to aim for
      # desired_boxes = total_weight/max_weight
      # # Determine how many bins to make (Make one extra just
      # # in case they can't all fit in desired # of boxes)
      # num_bins = desired_boxes + 1

      # bins = []
      # num_bins.times do |i|
      #   bins[i] = ParsePages::Bin.new
      # end

      # @items = mergesort(@items)

      # # Implement mergesort
      # def mergesort(items_array)
      #   return items_array if items_array.size <= 1
      #   mid = items_array.size / 2
      #   left  = items_array[0, mid]
      #   right = items_array[mid, items_array.size-mid]
      #   merge(mergesort(left), mergesort(right))
      # end

      # def merge(left, right)
      #   sorted = []
      #   until left.empty? or right.empty?
      #     if left.first.weight <= right.first.weight
      #       sorted << left.shift
      #     else
      #       sorted << right.shift
      #     end
      #   end
      #   sorted.concat(left).concat(right)
      # end
    end

    json = {}
    # Allows duplicate keys (not symbols) in a hash
    json.compare_by_identity

    num_boxes.times do |i|
      # Convert the books in each bin into a hash
      bins[i].contents.each do |content|
        index = bins[i].contents.index(content)
        bins[i].contents[index] = {
          "title" => content.title,
          "author" => content.author,
          "price" => content.price,
          "shipping_weight" => content.shipping_weight,
          "isbn-10" => content.isbn
        }
      end

      json["box"] = {
        "id" => i+1,
        "totalWeight" => bins[i].total_weight,
        "contents" => bins[i].contents
      }
    end

    return json
  end

end
