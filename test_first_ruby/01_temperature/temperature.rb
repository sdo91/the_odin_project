

def ftoc(temp_f)
    
    temp_c = (temp_f - 32)
    temp_c *= (5.0/9)
    temp_c
    
end


def ctof(temp_c)
    
    temp_f = temp_c * (9.0/5)
    temp_f += 32
    temp_f
    
end