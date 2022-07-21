from pydantic import BaseModel


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


class ProductResponseSchema(ProductRequestSchema):
    id: int

    class Config():
        orm_mode = True
