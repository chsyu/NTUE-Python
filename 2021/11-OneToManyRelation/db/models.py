from .database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey


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
    owner_id = Column(Integer, ForeignKey('user.id'))


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)
    is_admin = Column(Boolean)



