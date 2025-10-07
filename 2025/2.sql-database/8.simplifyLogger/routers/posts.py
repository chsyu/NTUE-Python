from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, selectinload, joinedload
from sqlalchemy import select
from typing import List

from db.engine import get_db
from models import Post, Author, Comment
from schemas.post import PostResponse, PostListResponse
from schemas.comment import CommentInPost

router = APIRouter(prefix="/api", tags=["posts"])

@router.get("/posts", response_model=PostListResponse)
async def get_all_posts(session: Session = Depends(get_db)):
    """取得所有文章"""
    try:
        stmt = select(Post).options(
            joinedload(Post.author),                                    
            selectinload(Post.comments).joinedload(Comment.author)
        )
        result = session.execute(stmt)
        posts = result.scalars().all()
        
        # 建構回應資料
        post_responses = []
        for post in posts:
            # 建構評論資料
            comments = [
                CommentInPost(
                    id=comment.id,
                    content=comment.content,
                    author_name=comment.author.name
                )
                for comment in post.comments
            ]
            
            # 建構文章資料
            post_response = PostResponse(
                id=post.id,
                slug=post.slug,
                title=post.title,
                content=post.content,
                likes=post.likes,
                author_id=post.author_id,
                author_name=post.author.name,
                comments=comments
            )
            post_responses.append(post_response)
        
        return PostListResponse(
            posts=post_responses,
            total=len(post_responses)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取文章列表時發生錯誤: {str(e)}"
        )

@router.get("/post/{slug}", response_model=PostResponse)
async def get_post_by_slug(slug: str, session: Session = Depends(get_db)):
    """根據 slug 取得特定文章"""
    try:
        stmt = select(Post).options(
            joinedload(Post.author),
            selectinload(Post.comments).joinedload(Comment.author)
        ).where(Post.slug == slug)
        result = session.execute(stmt)
        post = result.scalar_one_or_none()
        
        if not post:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"找不到 slug 為 '{slug}' 的文章"
            )
        
        # 建構評論資料
        comments = [
            CommentInPost(
                id=comment.id,
                content=comment.content,
                author_name=comment.author.name
            )
            for comment in post.comments
        ]
        
        # 建構文章資料
        post_response = PostResponse(
            id=post.id,
            slug=post.slug,
            title=post.title,
            content=post.content,
            likes=post.likes,
            author_id=post.author_id,
            author_name=post.author.name,
            comments=comments
        )
        
        return post_response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取文章時發生錯誤: {str(e)}"
        )