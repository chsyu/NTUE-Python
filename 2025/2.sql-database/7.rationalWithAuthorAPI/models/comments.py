from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Text, ForeignKey, UniqueConstraint  # ← 加入
from .base import Base

class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)

    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"), nullable=False
    )
    author_id: Mapped[int] = mapped_column(
        ForeignKey("authors.id", ondelete="RESTRICT"), nullable=False
    )

    # 關聯
    post = relationship("PostDB", back_populates="comments")  
    author = relationship("Author", back_populates="comments")

    # 複合唯一：同一篇文章、同一作者、同內容只能有一筆
    __table_args__ = (
        UniqueConstraint("post_id", "author_id", "content", name="uq_comments_triplet"),
    )

    def __repr__(self):
        return f"Comment(id={self.id}, post_id={self.post_id})"