require_relative '../app/class_helpers/web_scrapinizor'
require_relative '../app/class_helpers/book_parser'
require_relative '../app/class_helpers/create_object'


files_to_scrape = Dir.entries("./../data").select{|file| file.include?("html")}.map{|file| "./../data/#{file}"}

files_to_scrape.each do |file|

  scraped_file = Scrape::AmazonBook.new(file).nokogiri_scrape

  book_info = Parser::AmazonBookParser.new(scraped_file)

  Create::AmazonBook.new(book_info).create_object
end

def box_packing

  @warehouse_guy = Create::BookPackagePacker.new
  @warehouse_guy.begin_boxing
  # p Book.all

  Book.order(shipping_weight: :desc).each do |book|
      @book = book
      $book_weight = @book.shipping_weight.match((/\d+[,.]\d+/)).to_s.to_f
      p "Book #{book.id} shipping weight: #{$book_weight}"

    Box.all.each do |box|
      $box = box
      $box_total_weight = $box.totalWeight.match((/\d+[,.]\d+/)).to_s.to_f
      p "Box #{$box.id} total weight right now: #{$box_total_weight}"

      if ($box_total_weight + $book_weight) <= 10
        @warehouse_guy.add_item_to_box(@book)
        p "Putting book #{@book.id} into  box #{$box.id}"
        break
      elsif Box.find($box.id).next.empty?
        p "current book weight #{$book_weight}"
        p "Book #{@book.id} could fit in the next box"
        Box.create(totalWeight: "#{$book_weight} pounds", contents: [@book])
        # p "now the box weight it #{new_box.shipping_weight}"

        break
      else
        p "Book #{book.id} is too heavy for box #{$box.id}"

      end
    end
    puts
  end
end

box_packing




