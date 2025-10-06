from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.engine import Base

class Post(Base):
    __tablename__ = "posts"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(200), nullable=False, unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    likes: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    
    # 外鍵：文章屬於某位作者
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id"), nullable=False)
    
    # 關聯：文章屬於某位作者
    author: Mapped["Author"] = relationship("Author", back_populates="posts")
    # 關聯：一篇文章可以有多個評論
    comments: Mapped[list["Comment"]] = relationship("Comment", back_populates="post", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Post(id={self.id}, slug='{self.slug}', title='{self.title}')>"