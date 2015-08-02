class RuleSet
  def initialize(document)
    @document = document
  end

  def apply_rule_set
    {
      title: title,
      author: author,
      price: price,
      weight: weight,
      numerical_weight: weight[0...7].to_f,
      'isbn-10': isbn_10
    }
  end

  private

  def title
    @document.css('#btAsinTitle').children[0].to_s.strip
  end

  def author
    result = @document.xpath "//span[span[contains(text(), '(Author)') or contains(text(), '(Editor)')]]/a"
    create_author_list(result.children)
  end

  def create_author_list(authors)
    if authors.count > 1
      authors.reduce do |accumulator, author|
        accumulator.to_s + ', ' + author.to_s
      end
    else
      authors[0].to_s
    end
  end

  def price
    result = @document.xpath "//a[span[text()[contains(., 'Buy New')]]]/span[contains(@class, 'bb_price')]/text()"
    result.to_s.strip
  end

  def weight
    result = @document.xpath "//li[b[contains(text(), 'Shipping Weight:')]]"
    result.children[1].to_s[0...-2].strip
  end

  def isbn_10
    result = @document.xpath "//li[b[contains(text(), 'ISBN-10')]]"
    result.children[1].to_s.strip
  end


end
