from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base

class Author(Base):
    __tablename__ = "authors"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    
    # 關聯：一個作者可以有多篇文章
    posts: Mapped[list["Post"]] = relationship("Post", back_populates="author")
    # 關聯：一個作者可以有多個評論
    comments: Mapped[list["Comment"]] = relationship("Comment", back_populates="author")
    
    def __repr__(self):
        return f"<Author(id={self.id}, name='{self.name}', email='{self.email}')>"