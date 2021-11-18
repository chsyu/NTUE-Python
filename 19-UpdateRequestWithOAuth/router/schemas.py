from pydantic import BaseModel, validator, EmailStr
from typing import List


class ProductRequestSchema(BaseModel):
    category: str
    name: str
    sku: str
    price: int
    image: str
    description: str
    description_long: str
    currency: str
    countInStock: int
    owner_id: int


class ProductResponseSchema(ProductRequestSchema):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    email: EmailStr
    is_admin = False


class SignInRequestSchema(BaseModel):
    email: EmailStr
    password: str


class UpdateProfileRequestSchema(SignInRequestSchema):
    username: str
    address: str
    tel: str


class UserRequestSchema(UserBase):
    password: str

    @classmethod
    @validator("password")
    def password_must_have_6_digits(cls, v):
        if len(v) < 6:
            raise ValueError("Password must have at least 6 digits")
        return v


# class UserRequestSchema(UserBase):
#     password1: str
#     password2: str
#
#     @classmethod
#     @validator('password2')
#     def passwords_match(cls, v, values, **kwargs):
#         if 'password1' in values and v != values['password1']:
#             raise ValueError('passwords do not match')
#         return v
#
#     @classmethod
#     @validator("password1")
#     def password_must_have_6_digits(cls, v):
#         if len(v) < 6:
#             raise ValueError("Password must have at least 6 digits")
#         return v


class UserResponseSchema(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserSignInResponseSchema(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    user_id: int
    username: str


class ProductResponseWithUserSchema(ProductRequestSchema):
    id: int
    owner_id: int
    owner: UserResponseSchema

    class Config:
        orm_mode = True


class UserDetailResponseSchema(BaseModel):
    id: int = 0
    address: str = ""
    tel: str = ""
    owner_id: int = 0

    class Config:
        orm_mode = True


class UserResponseWithProductsSchema(UserBase):
    id: int
    user_detail: List[UserDetailResponseSchema] = []
    created_products: List[ProductResponseSchema] = []

    class Config:
        orm_mode = True
