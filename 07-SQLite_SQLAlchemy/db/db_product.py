from router.schemas import ProductBase
from sqlalchemy.orm.session import Session
from db.models import DbProduct


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
    print(new_product)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

async def get_all(db: Session):
    return db.query(DbProduct).all()


async def get_product_by_id(id:int, db: Session):
    return db.query(DbProduct).filter(DbProduct.id == id).first()


async def get_product_by_category(
  category:str, 
  db: Session):
    return db.query(DbProduct).filter(DbProduct.category == category).all()
