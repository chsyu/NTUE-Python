from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_homework

router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)


@router.post('')
def create(request, db: Session = Depends(get_db)):
    return db_homework.create(db, request)


@router.get('/feed')
def feed_initial_products(db: Session = Depends(get_db)):
    return db_homework.db_feed(db)


@router.get('/all')
def get_all_homeworks(db: Session = Depends(get_db)):
    return db_homework.get_all(db)


@router.get('/semester')
def get_homeworks_by_semester(semester: str = "", db: Session = Depends(get_db)):
    return db_homework.get_homework_by_semester(semester, db)


@router.get('/school')
def get_homeworks_by_semester(school: str = "", db: Session = Depends(get_db)):
    return db_homework.get_homework_by_school(school, db)
