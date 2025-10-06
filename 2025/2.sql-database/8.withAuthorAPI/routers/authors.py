from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, selectinload, joinedload
from sqlalchemy import select
from typing import List

from db.engine import get_db
from models import Author, Post, Comment
from schemas.author import AuthorResponse, AuthorDetailResponse

router = APIRouter(prefix="/api/authors", tags=["authors"])

@router.get("", response_model=List[AuthorResponse])
async def get_all_authors(session: Session = Depends(get_db)):
    """取得所有作者"""
    try:
        stmt = select(Author).order_by(Author.name.asc())
        result = session.execute(stmt)
        authors = result.scalars().all()
        
        return [AuthorResponse.model_validate(author) for author in authors]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者列表時發生錯誤: {str(e)}"
        )

@router.get("/{author_name}", response_model=AuthorDetailResponse)
async def get_author_by_name(author_name: str, session: Session = Depends(get_db)):
    """根據名稱取得特定作者詳細資料"""
    try:
        # 使用混合策略載入關聯資料
        stmt = select(Author).options(
            selectinload(Author.posts),                                # 一對多用 selectinload
            selectinload(Author.comments).joinedload(Comment.post)     # 評論和其對應文章
        ).where(Author.name == author_name)
        
        result = session.execute(stmt)
        author = result.scalar_one_or_none()
        
        if not author:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"找不到名稱為 '{author_name}' 的作者"
            )
        
        return AuthorDetailResponse.model_validate(author)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者詳細資料時發生錯誤: {str(e)}"
        )

@router.get("/id/{author_id}", response_model=AuthorDetailResponse)
async def get_author_by_id(author_id: int, session: Session = Depends(get_db)):
    """根據 ID 取得特定作者詳細資料"""
    try:
        # 使用混合策略載入關聯資料
        stmt = select(Author).options(
            selectinload(Author.posts),                                # 一對多用 selectinload
            selectinload(Author.comments).joinedload(Comment.post)     # 評論和其對應文章
        ).where(Author.id == author_id)
        
        result = session.execute(stmt)
        author = result.scalar_one_or_none()
        
        if not author:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"找不到 ID 為 {author_id} 的作者"
            )
        
        return AuthorDetailResponse.model_validate(author)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者詳細資料時發生錯誤: {str(e)}"
        )