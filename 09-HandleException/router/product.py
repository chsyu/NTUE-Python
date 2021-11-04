from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import ProductRequest, ProductResponse
from db.database import get_db
from db import db_product
from typing import List

router = APIRouter(
    prefix='/api/v1/products',
    tags=['products']
)


@router.post('', response_model=ProductResponse)
def create(request: ProductRequest, db: Session = Depends(get_db)):
    return db_product.create(db, request)


@router.get('/all', response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    return db_product.get_all(db)


@router.get('/id/{product_id}', response_model=ProductResponse)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    return db_product.get_product_by_id(product_id, db)


@router.get("/{category}", response_model=List[ProductResponse])
def get_product_by_category(category:str, db: Session = Depends(get_db)):
    return db_product.get_product_by_category(category, db)
