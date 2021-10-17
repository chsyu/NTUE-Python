def divide(dividend, divisor):
    return dividend / divisor

def add(addend1, addend2):
    return addend1 + addend2

print("mymodule.py:", __name__)

# -- importing from a folder --

import libs.mylib

print("mymodule.py:", __name__)
