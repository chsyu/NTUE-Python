from pydantic import BaseModel


class ProductBase(BaseModel):
  category: str
  name: str
  sku: str
  price: int
  image: str
  description: str
  description_long: str
  currency: str
  countInStock: int


class ProductDisplay(BaseModel):
  id: int
  category: str
  name: str
  sku: str
  price: int
  image: str
  description: str
  description_long: str
  currency: str
  countInStock: int
  class Config():
    orm_mode = True

