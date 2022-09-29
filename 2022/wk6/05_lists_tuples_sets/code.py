l = ["Bob", "Rolf", "Anne"]   # list
t = ("Bob", "Rolf", "Anne")   # tuple
s = {"Bob", "Rolf", "Anne"}   # set

# Access individual items in lists and tuples using the index.

print(f"l[0] = {l[0]}")
print(f"t[0] = {t[0]}")
# print(s[0])  # This gives an error because sets are unordered, so accessing element 0 of something without order doesn't make sense.

# Modify individual items in lists using the index.

l[0] = "Smith"
# t[0] = "Smith"  
# This gives an error 
# because tuples are "immutable".

print(f"l = {l}")
print(f"t = {t}")

# Add to a list by using `.append`

l.append("Jen")
print(f"After append Jen, l = {l}")
# Tuples cannot be appended to 
# because they are immutable.

# Use list(tuple) function 
# changing a tuple to a list
t_l = list(t);
print(f"Before append, t_l = {t_l}")
t_l.append("Bob")
print(f"After append, t_l = {t_l}")

# Add to sets by using `.add`

s.add("Jen")
print(f"After add Jen, s = {s}")

# Sets can't have the same element twice.

s.add("Bob")
print(f"After add Bob, s = {s}")
