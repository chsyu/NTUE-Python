from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_product
from typing import List

router = APIRouter(
    prefix='/api/v1/products',
    tags=['products']
)


@router.get('/all')
def get_all_products(db: Session = Depends(get_db)):
    return db_product.get_all(db)


@router.get('/id/{product_id}')
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    return db_product.get_product_by_id(product_id, db)


@router.get("/{category}")
def get_product_by_category(category: str, db: Session = Depends(get_db)):
    return db_product.get_product_by_category(category, db)
