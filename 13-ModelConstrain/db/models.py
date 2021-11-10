from .database import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey


class DbProduct(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(30))
    name = Column(String(30))
    sku = Column(String(30))
    price = Column(Integer)
    image = Column(String(100))
    description = Column(String(100))
    description_long = Column(String(255), nullable=True)
    currency = Column(String(10))
    countInStock = Column(Integer)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship('DbUser', back_populates='created_products')


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30))
    email = Column(String(30), unique=True)
    password = Column(String(255))
    is_admin = Column(Boolean, default=False)
    created_products = relationship('DbProduct', back_populates='owner')



