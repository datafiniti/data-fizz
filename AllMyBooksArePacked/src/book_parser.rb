require 'nokogiri'
require_relative 'rule_set'
class BookParser
  def initialize(files)
    @files = files
  end

  def parse
    @files.map do |file|
      process_file file
    end
  end

  private

  def process_file(file)
    opened_file = File.open file
    result = parse_file opened_file
    opened_file.close
    result
  end

  def parse_file(file)
    document = Nokogiri::HTML(file)
    apply_rules(document)
  end

  def apply_rules(document)
    RuleSet.new(document).apply_rule_set
  end
end
