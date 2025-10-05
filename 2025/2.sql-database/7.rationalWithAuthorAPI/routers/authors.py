# routers/authors.py
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from db.engine import engine
from models.authors import Author

router = APIRouter(prefix="/api/authors", tags=["authors"])

@router.get("/{author_name}")
def get_author_detail(author_name: str):
    with Session(engine) as s:
        author = s.scalar(
            select(Author)
            .options(
                selectinload(Author.posts),      # 一次載入該作者的所有文章
                selectinload(Author.comments)    # 一次載入該作者的所有留言
            )
            .where(Author.name == author_name)
        )
        if not author:
            raise HTTPException(status_code=404, detail="Author not found")
        return {
            "id": author.id,
            "name": author.name,
            "posts": [
                {"id": p.id, "slug": p.slug, "title": p.title}
                for p in author.posts
            ],
            "comments": [
                {"id": c.id, "content": c.content, "post_id": c.post_id, "post_title": c.post.title}
                for c in author.comments
            ],
        }