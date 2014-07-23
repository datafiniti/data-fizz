class ParsePages::Ship

  def run(items, max_weight)
    total_weight = 0
    bins = []
    items.each do |item|
      total_weight += item.weight
    end

    num_bins = (total_weight/max_weight).ceil
    num_bins.times do |i|
      bins << ParsePages::Bin.new
    end

    # Sorts array from highest to lowest by weight
    items = mergesort(items)

    # Loop through all bins for each item
    # If item + total_weight = max_weight, put in bin
    # If bin empty -> insert item
    # If item fits, but doesn't = max_weight, fit_bin = first bin item can fit in
    # If it's the last bin, it doesn't fit in a bin, and it hasn't been added -> make a new bin
    items.each do |item|
      fit_bin = nil
      added = false
      item_hash = build_item(item)

      bins.each do |bin|
        if bin.total_weight + item.weight == max_weight && !added
          bin.add_content(item_hash, item.weight)
          added = true
          break
        elsif bin.contents == [] && !added
          bin.add_content(item_hash, item.weight)
          added = true
          break
        elsif bin.total_weight + item.weight < max_weight && !added
          fit_bin = bin if !fit_bin
        elsif bin == bins.last && bin.total_weight + item.weight > max_weight && !fit_bin && !added
          new_bin = ParsePages::Bin.new
          new_bin.add_content(item_hash, item.weight)
          added = true
          bins << new_bin
          break
        end
      end

      if !added
        fit_bin.add_content(item_hash, item.weight)
      end

    end

    json = { "boxes" => [] }

    bins.length.times do |i|
      json["boxes"] << { "box" =>
        {
          "id" => i+1,
          "totalWeight" => "#{bins[i].total_weight} pounds",
          "contents" => bins[i].contents
        }
      }
    end

    return { success?: true, "boxes" => json["boxes"] }
  end

  def build_item(item)
    return {
      "title" => item.title,
      "author" => item.author,
      "price" => item.price,
      "shipping_weight" => item.shipping_weight,
      "isbn-10" => item.isbn
    }
  end

  def mergesort(items_array)
    return items_array if items_array.size <= 1
    mid = items_array.size / 2
    left  = items_array[0, mid]
    right = items_array[mid, items_array.size-mid]
    merge(mergesort(left), mergesort(right))
  end

  def merge(left, right)
    sorted = []
    until left.empty? or right.empty?
      if left.first.weight <= right.first.weight
        sorted << right.shift
      else
        sorted << left.shift
      end
    end
    sorted.concat(left).concat(right)
  end

end
