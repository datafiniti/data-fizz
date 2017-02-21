require 'nokogiri'

module BoxPacker
  class AmazonProcessor

    def self.get_book_info(from, file)
      {
        "title" => get_title(from, file),
        "author" => get_author(from, file),
        "price" => get_price(from, file),
        "shipping_weight" => get_shipping_weight(from, file),
        "isbn-10" => get_isbn_10(from, file)
      }
    end

    def self.get_title(from, file)
      case from
      when :file
        file.at("#btAsinTitle").text.split(/\s\[/)[0]
      when :web
        file.at("#productTitle").text  
      end
    end

    def self.get_author(from, file)
      case from
      when :file
        file.at(".parseasinTitle").next_element.css("a").map {|author| author.text}.join(", ")
      when :web
        file.css("#byline").css(".contribution").map {|contribution| contribution.previous_element.text}.join(", ").gsub(/[\n\t]/, "")
      end
    end

    def self.get_price(from, file)
      case from
      when :file
        "#{file.at("#rbb_bb_trigger").at(".bb_price").text.strip} USD"
      when :web
        "#{file.at("span.a-color-price").text} USD"
      end
    end

    def self.get_shipping_weight(from, file)
      case from
      when :file, :web
        file.at("#productDetailsTable").at("li:contains('Shipping Weight')").text.split[2,2].join(" ")
      end
    end

    def self.get_isbn_10(from, file)
      case from
      when :file, :web
        file.at("#productDetailsTable").at('li:contains("ISBN-10")').text.split.last
      end
    end

  end
end
