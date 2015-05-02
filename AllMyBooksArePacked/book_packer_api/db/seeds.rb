require_relative '../app/class_helpers/web_scrapinizor'
require_relative '../app/class_helpers/book_parser'
require_relative '../app/class_helpers/create_object'

def scrape_and_seed_books
  files_to_scrape = Dir.entries("./../data").select{|file| file.include?("html")}.map{|file| "./../data/#{file}"}

  files_to_scrape.each do |file|

    scraped_file = Scrape::AmazonBook.new(file).nokogiri_scrape

    book_info = Parser::AmazonBookParser.new(scraped_file)

    Create::AmazonBook.new(book_info).create_object
  end
end

def box_packing

  @warehouse_guy = Create::BookPackagePacker.new
  @warehouse_guy.begin_boxing

  Book.order(shipping_weight: :desc).each do |book|
      @book = book
      $book_weight = @book.shipping_weight.match((/\d+[,.]\d+/)).to_s.to_f

    Box.all.each do |box|

      $box = box
      $box_total_weight = $box.totalWeight.match((/\d+[,.]\d+/)).to_s.to_f

      if (@warehouse_guy.weigh_box_with_book) <= 10
        @warehouse_guy.add_item_to_box(@book)
        break
      elsif Box.find($box.id).next.empty?
        Box.create(totalWeight: "#{$book_weight} pounds", contents: [@book])
        break
      end
    end
  end
end

scrape_and_seed_books
box_packing




