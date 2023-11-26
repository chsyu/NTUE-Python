from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from router.schemas import HomeworkRequestSchema, HomeworkResponseSchema
from db.database import get_db
from db import db_homework
from typing import List
import logging
from logging.handlers import RotatingFileHandler

router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)

# 設置日誌處理器，限制日誌大小並進行轉儲
logger = logging.getLogger("myapp")

handler = RotatingFileHandler('myapp.log', maxBytes=1024*1024*5, backupCount=3)
logger = logging.getLogger('myapp')
logger.setLevel(logging.INFO)
logger.addHandler(handler)


@router.post('', response_model=HomeworkResponseSchema)
def create(request: HomeworkRequestSchema, db: Session = Depends(get_db)):
    return db_homework.create(db, request)


@router.get('/feed')
def feed_initial_products(db: Session = Depends(get_db)):
    logger.info("feed路徑被訪問")
    return db_homework.db_feed(db)


@router.get('/all', response_model=List[HomeworkResponseSchema])
def get_all_homeworks(db: Session = Depends(get_db)):
    logger.info("all路徑被訪問")
    return db_homework.get_all(db)


@router.get('/semester', response_model=List[HomeworkResponseSchema])
def get_homeworks_by_semester(semester: str = "", db: Session = Depends(get_db)):
    return db_homework.get_homework_by_semester(semester, db)


@router.get('/school', response_model=List[HomeworkResponseSchema])
def get_homeworks_by_semester(school: str = "", db: Session = Depends(get_db)):
    return db_homework.get_homework_by_school(school, db)
