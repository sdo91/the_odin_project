

def add(a, b)
  a + b
end


def subtract(a, b)
  a-b
end


def sum(values)
  sum = 0
  values.each do |value|
    sum += value
  end
  sum
end


def mult(a,b)
  a*b
end


def pow(a,b)
  a**b
end


def fact(a)
  result = 1
  2.upto(a) do |i|
    result *= i
  end
  result
end



