from sqlalchemy.orm.session import Session
from db.models import DbProduct


def get_all(db: Session):
    return db.query(DbProduct).all()


def get_product_by_id(product_id: int, db: Session):
    return db.query(DbProduct).filter(DbProduct.id == product_id).first()


def get_product_by_category(category: str, db: Session):
    return db.query(DbProduct).filter(DbProduct.category == category).all()
