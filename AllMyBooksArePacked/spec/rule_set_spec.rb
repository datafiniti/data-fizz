require 'spec_helper'

RSpec.describe RuleSet do
  it 'should supply the rules to the document' do
    opened_file = File.open 'data/book1.html'
    document = Nokogiri::HTML(opened_file)
    result = RuleSet.new(document).apply_rule_set
    expect(result).to eq(expected_result)
    opened_file.close
  end

  def expected_result
    {
      title: 'Zealot: The Life and Times of Jesus of Nazareth',
      author: 'Reza Aslan',
      price: '$16.89',
      weight: '1.2 pounds',
      'isbn-10': '140006922X'
    }
  end
end
