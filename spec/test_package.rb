require '../lib/package.rb'
require 'minitest/autorun'

class Tests < Minitest::Unit::TestCase
  def number_of_packages list
    BoxContainer.new(list).boxes.size
  end
 
  def test_1
    list = [9.0, 5.0, 1.0, 5.0].map { |i| Package.new(i) }
    assert_equal 2, number_of_packages(list)
  end
 
  def test_2
    list = [Package.new(9.0)]
    assert_equal 1, number_of_packages(list)
  end
 
  def test_3
    list = [9.0, 2.0].map { |i| Package.new(i) }
    assert_equal 2, number_of_packages(list)
  end
 
  def test_4
    list = [9.0, 5.0, 1.0, 5.0, 1.0, 1.0, 5.0, 7.0, 1.0, 5.0].map { |i| Package.new(i) }
    assert_equal 4, number_of_packages(list)
  end
end
