class RuleSet
  def initialize(document)
    @document = document
  end

  def title
    @document.css('#btAsinTitle').children[0].to_s.strip
  end

  def author
    result = @document.xpath "//a[contains(@href, 'field-author')]"
    result.children.to_s
  end

  def price
    @document.css('.bb_price').children.to_s.strip
  end

  def weight
    result = @document.xpath "//li[b[contains(text(), 'Shipping Weight:')]]"
    result.children[1].to_s[0...-2].strip
  end

  def isbn_10
    result = @document.xpath "//li[b[contains(text(), 'ISBN-10')]]"
    result.children[1].to_s.strip
  end

  def apply_rule_set
    {
      title: title,
      author: author,
      price: price,
      weight: weight,
      isbn_10: isbn_10
    }
  end
end
