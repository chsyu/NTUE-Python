from fastapi import HTTPException, status
from router.schemas import ProductBase
from sqlalchemy.orm.session import Session
from .products_feed import products

from db.models import DbProduct


async def db_feed(db: Session):
  new_product_list = [DbProduct(
      category=product["category"],
      name=product["name"],
      sku=product["sku"],
      price=product["price"],
      image=product["image"],
      description=product["description"],
      description_long=product["description_long"],
      currency=product["currency"],
      countInStock=product["countInStock"]
  ) for product in products]
  db.query(DbProduct).delete()
  db.commit()
  db.add_all(new_product_list)
  db.commit()
  return db.query(DbProduct).all()

async def create(db: Session, request: ProductBase):
    new_product = DbProduct(
        category=request.category,
        name=request.name,
        sku=request.sku,
        price=request.price,
        image=request.image,
        description=request.description,
        description_long=request.description_long,
        currency=request.currency,
        countInStock=request.countInStock
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

async def get_all(db: Session):
    return db.query(DbProduct).all()

async def get_product_by_id(id:int, db: Session):
    product = db.query(DbProduct).filter(DbProduct.id == id).first()
    if not product:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f'Product with id = {id} not found')
    return product


async def get_product_by_category( category:str,  db: Session):
    product = db.query(DbProduct).filter(DbProduct.category == category).all()
    if not product:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                          detail=f'Product with category = {id} not found')
    return product
