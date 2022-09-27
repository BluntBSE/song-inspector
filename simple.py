import sys

def Hello():
    print("hello world!@")
    return('Returned hello')

def multiply_nums(a,b):
    result = a*b
    print(result)
    return result

def quit():
    sys.exit()
##Stop this from closing when you run it from shell
