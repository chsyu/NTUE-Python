from functools import wraps


user = {"username": "jose", "access_level": "guest"}


def make_secure(func):
    @wraps(func)
    def secure_function(panel):
        if user["access_level"] == "admin":
            return func(panel)
        else:
            return f"No admin permissions for {user['username']}."

    return secure_function


@make_secure
def get_password(panel):
    '''
        This is a get_password function, 
        you can input panel type to choose different password
        panel = "admin" or "billing"
    '''
    if panel == "admin":
        return "1234"
    elif panel == "billing":
        return "super_secure_password"

print(get_password.__doc__)
print(get_password("admin"))


# print(get_password("admin"))  # Error before adding parameters, works after
# But now we've coupled our function to our decorator. We can't decorate a different function, which isn't great!
# Instead we could take unlimited parameters and pass whatever we get down to the original function


def make_secure(func):
    @wraps(func)
    def secure_function(*args, **kwargs):
        if user["access_level"] == "admin":
            return func(*args, **kwargs)
        else:
            return f"No admin permissions for {user['username']}."

    return secure_function


@make_secure
def get_password(panel):
    if panel == "admin":
        return "1234"
    elif panel == "billing":
        return "super_secure_password"


print(get_password("admin"))
print(get_password("billing"))

user = {"username": "bob", "access_level": "admin"}

print(get_password("admin"))
print(get_password("billing"))
