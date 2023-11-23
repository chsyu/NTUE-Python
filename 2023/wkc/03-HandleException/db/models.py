from .database import Base
from sqlalchemy import Column, Integer, String


class DbHomework(Base):
    __tablename__ = 'homework'
    id = Column(Integer, primary_key=True, index=True)
    school = Column(String(50))
    semester = Column(String(50))
    workName = Column(String(100))
    githubUrl = Column(String(500))
    websiteUrl = Column(String(500))
    pptUrl = Column(String(500))
    imgUrl = Column(String(500))
    skill = Column(Integer(100))
    name = Column(String(100))

