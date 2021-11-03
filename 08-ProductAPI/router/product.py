from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import ProductBase, ProductDisplay
from db.database import get_db
from db import db_product
from typing import List

router = APIRouter(
    prefix='/api/v1/products',
    tags=['products']
)


@router.post('', response_model=ProductDisplay)
def create(request: ProductBase, db: Session = Depends(get_db)):
    return db_product.create(db, request)


@router.get('/all', response_model=List[ProductDisplay])
def get_all_products(db: Session = Depends(get_db)):
    return db_product.get_all(db)


@router.get('/id/{id}', response_model=ProductDisplay)
def get_product_by_id(id: int, db: Session = Depends(get_db)):
    return db_product.get_product_by_id(id, db)


@router.get("/{category}", response_model=List[ProductDisplay])
def get_product_by_category(category: str, db: Session = Depends(get_db)):
    return db_product.get_product_by_category(category, db)
