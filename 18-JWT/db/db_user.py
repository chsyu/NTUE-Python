from fastapi import HTTPException, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm.session import Session
from sqlalchemy import func, exc
from sqlalchemy.exc import IntegrityError
from router.schemas import UserRequestSchema, SignInRequestSchema
from db.models import DbUser
from utils.hash import bcrypt, verify
from utils.oauth2 import create_access_token


def register(db: Session, request: UserRequestSchema) -> DbUser:
    new_user = DbUser(
        username=request.username,
        email=request.email,
        password=bcrypt(request.password),
        is_admin=request.is_admin,
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"{exc}".split('\n')[0])


def signin(db: Session, request: SignInRequestSchema):
    user = db.query(DbUser).filter(func.upper(DbUser.email) == request.email.upper()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with email = {request.email} not found')
    if not verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='Incorrect password')

    access_token = create_access_token(data={'username': user.username})

    return {
        'access_token': access_token,
        'user_id': user.id,
        'username': user.username
    }


def update_profile(db: Session, request: SignInRequestSchema) -> DbUser:
    user = db.query(DbUser).filter(func.upper(DbUser.username) == request.username.upper()).first()


def get_all_users(db: Session) -> list[DbUser]:
    users = db.query(DbUser).all()
    if not users:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'Users not found')
    return users


def get_user_by_id(user_id: int, db: Session) -> DbUser:
    user = db.query(DbUser).filter(DbUser.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id = {user_id} not found')
    return user


def get_user_by_email(user_email: str, db: Session) -> DbUser:
    user = db.query(DbUser).filter(func.upper(DbUser.email) == user_email.upper()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with email = {user_email} not found')
    return user


def get_user_by_username(user_name: str, db: Session) -> DbUser:
    user = db.query(DbUser).filter(func.upper(DbUser.username) == user_name.upper()).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with email = {user_name} not found')
    return user
