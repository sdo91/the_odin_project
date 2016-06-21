

def echo(str)
  str
end

def shout(str)
  str.upcase
end

def repeat(str, num_times = 2)
  
  result = str+'' # copy
  
  2.upto(num_times) do |i|
    # puts i
    result << ' '
    result << str
  end
  
  result
end

def start_of_word(str)
  # todo
  str
end


# puts repeat('hi')
# puts repeat('hi', 2)
# puts repeat('hi', 3)




