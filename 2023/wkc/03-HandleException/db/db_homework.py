from fastapi import HTTPException, status
from router.schemas import HomeworkRequestSchema
from sqlalchemy.orm.session import Session
from db.models import DbHomework


def create(db: Session, request: HomeworkRequestSchema):
    new_homework = DbHomework(
        school = request.school,
        semester = request.semester,
        workName = request.workName,
        githubUrl = request.githubUrl,
        websiteUrl = request.websiteUrl,
        pptUrl = request.pptUrl,
        imgUrl = request.imgUrl,
        skill = request.skill,
        name = request.name
    )
    db.add(new_homework)
    db.commit()
    db.refresh(new_homework)
    return new_homework


def get_all(db: Session):
    return db.query(DbHomework).all()


def get_homework_by_semester(semester: int, db: Session):
    homework = db.query(DbHomework).filter(DbHomework.semester == semester).first()
    if not homework:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Homework with semester = {semester} not found')
    return homework


def get_homework_by_school(school: str, db: Session):
    homework = db.query(DbHomework).filter(DbHomework.school == school).all()
    if not homework:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Homework with school = {school} not found')
    return homework
