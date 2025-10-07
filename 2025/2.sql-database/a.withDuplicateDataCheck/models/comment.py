from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.engine import Base

class Comment(Base):
    __tablename__ = "comments"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    
    # 外鍵：評論屬於某篇文章
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"), nullable=False)
    # 外鍵：評論屬於某位作者
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id"), nullable=False)
    
    # 關聯：評論屬於某篇文章
    post: Mapped["Post"] = relationship("Post", back_populates="comments")
    # 關聯：評論屬於某位作者
    author: Mapped["Author"] = relationship("Author", back_populates="comments")
    
    def __repr__(self):
        return f"<Comment(id={self.id}, post_id={self.post_id}, author_id={self.author_id})>"