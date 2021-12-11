from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import CreateOrderRequestSchema, CreateOrderResponseSchema
from db.database import get_db
from db import db_order
from typing import List

router = APIRouter(
    prefix='/api/v1/orders',
    tags=['orders']
)


@router.post('/create',response_model=CreateOrderResponseSchema)
def create_order(request:CreateOrderRequestSchema, db: Session = Depends(get_db)):
    return db_order.create(db=db, request=request)


@router.get('/id/{order_id}')
def get_order_by_id(order_id: str, db: Session = Depends(get_db)):
    return db_order.get_order_by_id(order_id=order_id, db=db)
