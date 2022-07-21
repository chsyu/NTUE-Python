from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql.schema import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

class DbProduct(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(30), nullable=False)
    name = Column(String(30), nullable=False)
    sku = Column(String(30))
    price = Column(Integer, nullable=False)
    image = Column(String(100), nullable=False)
    description = Column(String(100), nullable=False)
    description_long = Column(String(255), nullable=True)
    currency = Column(String(10))
    countInStock = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship('DbUser', back_populates='created_products')


class DbUserDetail(Base):
    __tablename__ = 'user_detail'
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255))
    tel = Column(String(30))
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner_info = relationship("DbUser", back_populates='user_detail')


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True, nullable=False)
    email = Column(String(30), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=True)
    created_products = relationship('DbProduct', back_populates='owner')
    user_detail = relationship('DbUserDetail', back_populates="owner_info", uselist=False)


class DbOrder(Base):
    __tablename__ = 'order'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String, nullable=False)
    postal_code = Column(String, nullable=False)
    country = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)
    created_time = Column(Integer, nullable=True)
    modified_time = Column(Integer, nullable=True)
    items_price = Column(Integer, nullable=False)
    shipping_price = Column(Float, nullable=False)
    tax_price = Column(Float, nullable=False)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship('DbUser')
    order_items = relationship('DbOrderItems')


class DbOrderItems(Base):
    __tablename__ = 'order_item'
    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False)
    order_id = Column(Integer, ForeignKey('order.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
    product_detail = relationship('DbProduct')


