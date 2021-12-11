from .database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql.schema import ForeignKey


class DbProduct(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)
    name = Column(String(100), nullable=False)
    sku = Column(String(100))
    price = Column(Integer, nullable=False)
    image = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    description_long = Column(String(1000), nullable=True)
    currency = Column(String(30))
    countInStock = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner = relationship('DbUser', back_populates='created_products')


class DbUserDetail(Base):
    __tablename__ = 'user_detail'
    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(255))
    tel = Column(String(100))
    owner_id = Column(Integer, ForeignKey('user.id'))
    owner_info = relationship("DbUser", back_populates='user_detail')


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=True)
    created_products = relationship('DbProduct', back_populates='owner')
    user_detail = relationship('DbUserDetail', back_populates="owner_info", uselist=False)


class DbOrder(Base):
    __tablename__ = 'order'
    id = Column(String(255), primary_key=True, nullable=False)
    username = Column(String(100), nullable=False)
    full_name = Column(String(100), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    postal_code = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    payment_method = Column(String(100), nullable=False)
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
    qty = Column(Integer, nullable=True)
    category = Column(String(100), nullable=True)
    name = Column(String(100), nullable=True)
    image = Column(String(255), nullable=True)
    price = Column(Integer, nullable=True)
    countInStock = Column(Integer, nullable=True)
    order_id = Column(String(255), ForeignKey('order.id'), nullable=False)
    product_id = Column(Integer, ForeignKey('product.id'))
    product_detail = relationship('DbProduct')


