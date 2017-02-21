class ParsePages::Book

  attr_reader :page, :title, :author, :price, :shipping_weight, :weight, :isbn

  def initialize(filename)
    @page = Nokogiri::HTML(open("data/#{filename}"))
  end

  def title
    @title = @page.css("#btAsinTitle").text
    @title.slice! " [Hardcover]"
    @title.slice! " [Paperback]"
    @title
  end

  def author
    @author = @page.css(".buying > span > a")[0].text
    @author
  end

  def price
    @price = @page.css(".priceLarge").text
    @price = @page.css(".rentPrice")[0].text if @price == ""
    @price += " USD"
    @price
  end

  def shipping_weight
    @shipping_weight = @page.search('li').text_includes('pounds').text.match(/[0-9].[0-9]\s[a-zA-Z]*/).to_s
    @shipping_weight
  end

  def weight
    @weight = @page.search('li').text_includes('pounds').text.match(/[0-9].[0-9]/).to_s.to_f
    @weight
  end

  def isbn
    @isbn = @page.search('li').text_includes('ISBN-10').text.gsub!(/ISBN-10: /, "").to_s.to_i
    @isbn
  end

end
