from pydantic import BaseModel
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
    email: str
    is_admin: bool


class UserRequestSchema(UserBase):
    password: str


class UserResponseSchema(UserBase):
    id: int

    class Config:
        orm_mode = True


class ProductResponseWithUserSchema(ProductRequestSchema):
    id: int
    owner_id: int
    owner: UserResponseSchema

    class Config:
        orm_mode = True


class UserResponseWithProductsSchema(UserBase):
    id: int
    created_products: List[ProductResponseSchema] = []

    class Config:
        orm_mode = True
