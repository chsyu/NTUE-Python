from fastapi import APIRouter, HTTPException
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.orm import selectinload, joinedload

from db.engine import engine
from models.authors import Author
from models.posts import PostDB
from models.comments import Comment
from schemas.posts import PostOut
from schemas.comments import CommentOut

router = APIRouter(
   prefix='/api/posts',
   tags=['blog posts']
)

def _author_id_by_name(s: Session, name: str) -> int:
    aid = s.scalar(select(Author.id).where(Author.name == name))
    if aid is not None:
        return aid
    a = Author(name=name)
    s.add(a)
    s.flush()
    return a.id

@router.get("", response_model=List[PostOut])
def list_posts(limit: int = 50, offset: int = 0):
    with Session(engine) as s:
        stmt = (
            select(PostDB)
            .options(
                joinedload(PostDB.author),                                     # 帶出作者
                selectinload(PostDB.comments).joinedload(Comment.author)       # 帶出留言 + 留言作者
            )
            .order_by(PostDB.id.asc())
            .limit(limit).offset(offset)
        )
        rows = s.scalars(stmt).all()

        result: List[PostOut] = []
        for p in rows:
            result.append(
                PostOut(
                    id=p.id,
                    slug=p.slug,
                    title=p.title,
                    author=p.author.name,
                    content=p.content,
                    likes=p.likes,
                    comments=[
                        CommentOut(id=c.id, author=c.author.name, content=c.content)
                        for c in p.comments
                    ],
                )
            )
        return result

@router.get("/{slug}", response_model=PostOut)
def get_post_by_slug(slug: str):
    with Session(engine) as s:
        stmt = (
            select(PostDB)
            .where(PostDB.slug == slug)
            .options(
                joinedload(PostDB.author),
                selectinload(PostDB.comments).joinedload(Comment.author)
            )
        )
        p = s.scalar(stmt)
        if not p:
            raise HTTPException(404, detail="Post not found")

        return PostOut(
            id=p.id,
            slug=p.slug,
            title=p.title,
            author=p.author.name,
            content=p.content,
            likes=p.likes,
            comments=[
                CommentOut(id=c.id, author=c.author.name, content=c.content)
                for c in p.comments
            ],
        )