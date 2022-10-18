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


class UserRequestSchema(BaseModel):
    username: str
    email: str
    password: str
    is_admin: bool


class ProductResponseSchema(ProductRequestSchema):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserResponseSchema(UserRequestSchema):
    id: int
    created_products: List[ProductResponseSchema] = []

    class Config:
        orm_mode = True
