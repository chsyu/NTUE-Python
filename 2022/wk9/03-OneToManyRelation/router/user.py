from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import UserRequestSchema, UserResponseSchema
from db.database import get_db
from db import db_user
from typing import List

router = APIRouter(
    prefix='/api/v1/users',
    tags=['users']
)


@router.post('', response_model=UserResponseSchema)
def create(request: UserRequestSchema, db: Session = Depends(get_db)):
    return db_user.create(db=db, request=request)


@router.get('/all', response_model=List[UserResponseSchema])
def get_all_products(db: Session = Depends(get_db)):
    return db_user.get_all(db)
