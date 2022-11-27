from .database import Base
from sqlalchemy import Column, Integer, Boolean, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey


class DbProduct(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True,  unique=True, index=True)
    category = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    sku = Column(Text)
    price = Column(Integer, nullable=False)
    image = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    description_long = Column(Text, nullable=True)
    currency = Column(Text)
    countInStock = Column(Integer, nullable=False)
    owner_id = Column(Integer, ForeignKey('user.id', deferrable=True))
    owner = relationship('DbUser', back_populates='created_products')


class DbUserDetail(Base):
    __tablename__ = 'user_detail'
    id = Column(Integer, primary_key=True,  unique=True, index=True)
    address = Column(Text)
    tel = Column(Text)
    owner_id = Column(Integer, ForeignKey('user.id', deferrable=True))
    owner_info = relationship("DbUser", back_populates='user_detail')


class DbUser(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, unique=True, index=True)
    username = Column(Text, unique=True, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password = Column(Text, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=True)
    created_products = relationship('DbProduct', back_populates='owner')
    user_detail = relationship('DbUserDetail', back_populates="owner_info", uselist=False)





