from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import HomeworkRequestSchema, HomeworkResponseSchema
from db.database import get_db
from db import db_homework
from typing import List
router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)


@router.post('', response_model=HomeworkResponseSchema)
def create(request: HomeworkRequestSchema, db: Session = Depends(get_db)):
    return db_homework.create(db, request)


@router.get('/all', response_model=List[HomeworkResponseSchema])
def get_all_homeworks(db: Session = Depends(get_db)):
    return db_homework.get_all(db)