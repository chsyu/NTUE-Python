movies_watched = {"The Matrix", "Green Book", "Her"}
user_movie = input("Enter something you've watched recently: ")

if user_movie in movies_watched:
    print(f"I've watched {user_movie} too!")
else:
    print("I haven't watched that yet.")

# --

user_input = input("Enter 'y' if you would like to play: ")

if user_input in ("y", "Y"):
    print("You do like to play.")
else:
    print("You do not like to play")


