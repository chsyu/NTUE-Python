from fastapi import HTTPException, status
from router.schemas import UserRequestSchema
from sqlalchemy.orm.session import Session

from db.models import DbUser


def create(db: Session, request: UserRequestSchema) -> DbUser:
    new_user = DbUser(
        username=request.username,
        email=request.email,
        password=request.password,
        is_admin=request.is_admin,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def get_all(db: Session) -> list[DbUser]:
    users = db.query(DbUser).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Users not found')
    return users
