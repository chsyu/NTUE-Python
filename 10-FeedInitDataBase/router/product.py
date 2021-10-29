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
async def create(request: ProductBase, db: Session = Depends(get_db)):
  return await db_product.create(db, request)


@router.get('/feed', response_model=List[ProductDisplay])
async def feed_inital_products(db: Session = Depends(get_db)):
    return await db_product.db_feed(db)

@router.get('/all', response_model=List[ProductDisplay])
async def get_all_products(db: Session = Depends(get_db)):
    return await db_product.get_all(db)


@router.get('/id/{id}', response_model=ProductDisplay)
async def get_product_by_id(id:int, db: Session = Depends(get_db)):
    return await db_product.get_product_by_id(id, db)


@router.get("/{category}", response_model=List[ProductDisplay])
async def get_product_by_category(category:str, db: Session = Depends(get_db)):
    return await db_product.get_product_by_category(category, db)
