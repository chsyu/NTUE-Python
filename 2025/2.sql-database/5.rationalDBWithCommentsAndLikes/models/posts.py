from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Text, Integer, ForeignKey
from .base import Base

class PostDB(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True) 
    slug: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    likes: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id", ondelete="RESTRICT"), nullable=False)

    # 關聯
    author = relationship("Author", back_populates="posts")
    comments = relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    def __repr__(self):
        return f"Post(id={self.id}, slug={self.slug}, title={self.title})"