from .database import Base
from sqlalchemy import Column, Integer, String


class DbProduct(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    name = Column(String)
    sku = Column(String)
    price = Column(Integer)
    image = Column(String)
    description = Column(String)
    description_long = Column(String)
    currency = Column(String)
    countInStock = Column(Integer)
