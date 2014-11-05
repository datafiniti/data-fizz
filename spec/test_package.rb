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
    sum = 0.0
    assert_equal 4, number_of_packages(list)

    # Confirm total weight has not changed
    assert_equal 40.0, list.inject(0){ |sum, x| sum + x.weight}
  end

  def test_5
    list = %w(9.4 8.8 7.8 7.6 6.4 5.6 4.9 4.4 4.1 3.6 3.6 3.2 2.8 2.6 2.2 2.2 1.4 1.4 1.4 1.2)
    list = list.map(&:to_f).shuffle.map { |i| Package.new(i) }
    assert_equal 9, number_of_packages(list)
    
    # Confirm total weight has not changed
    sum = 0.0
    assert_equal 84.6, list.inject(0){ |sum, x| sum + x.weight}.round(2)
  end

  def test_6
    list = %w(9.4 8.8 7.8 7.6 6.4 5.6 4.9 4.4 4.1 3.6 3.6 3.2 2.8 2.6 2.2 2.2 1.4 1.4 1.4 1.2)
    list = list.map(&:to_f).shuffle.map { |i| Package.new(i) }

    packages = BoxContainer.new(list).boxes

    results = []
    packages.each do |x|
      results << x.items.inject(0) { |sum,y| sum + y.weight }
    end

    results.map! { |x| x.round(2) }
    assert_equal [9.4, 10.0, 10.0, 9.8, 10.0, 10.0, 9.0, 9.6, 6.8], results

  end

end
