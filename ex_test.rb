require "test/unit"
class StringCalc
  def self.add(str)
    return 0 if str.empty?
    str.split(",").map(&:to_i).reduce(&:+)
  end

end
class StringCalcTest < Test::Unit::TestCase
  def test_string_with_no_digit
    assert_equal(0, StringCalc.add(""))
  end

  def test_string_with_one_num
    assert_equal(11, StringCalc.add("11"))
  end

  def test_string_with_two_nums
    assert_equal(3,StringCalc.add("1,2"))
  end

  def test_equals_four
    assert_equal(4,StringCalc.add("2,2"))
  end
end
