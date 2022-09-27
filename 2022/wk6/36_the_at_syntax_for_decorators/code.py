user = {"username": "jose", "access_level": "guest"}


def make_secure(func):
    def secure_function(*args, **kwargs):
        if user["access_level"] == "admin":
            return func(*args, **kwargs)
        else:
            return f"No admin permissions for {user['username']}."

    return secure_function


@make_secure
def get_admin_password():
    return "1234"

print(get_admin_password.__doc__)
print(get_admin_password())

# -- keeping function name and docstring --
import functools


user = {"username": "jose", "access_level": "guest"}


def make_secure(func):
    @functools.wraps(func)
    def secure_function():
        if user["access_level"] == "admin":
            return func()
        else:
            return f"No admin permissions for {user['username']}."

    return secure_function


@make_secure
def get_admin_password():
    '''
        Hello, this is the docstring
    '''
    return "1234"

print(get_admin_password.__doc__)
print(get_admin_password())