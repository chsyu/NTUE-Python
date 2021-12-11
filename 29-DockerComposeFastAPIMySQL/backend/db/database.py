from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user_name = "user"
password = "password"
host = "db"
database_name = "sample_db"

SQLALCHEMY_DATABASE_URL = 'mysql://%s:%s@%s/%s?charset=utf8mb4' % (
    user_name,
    password,
    host,
    database_name,
)

engine = create_engine(
    'mysql+pymysql://user:password@db:3306/sample_db', convert_unicode=True, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()