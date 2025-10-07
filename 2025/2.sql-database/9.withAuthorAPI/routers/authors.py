from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, selectinload, joinedload
from sqlalchemy import select
from typing import List

from db.engine import get_db
from models import Author, Post, Comment
from schemas.author import AuthorResponse, AuthorDetailResponse
from config.logging_config import get_logger

router = APIRouter(prefix="/api/authors", tags=["authors"])

logger = get_logger(__name__)

@router.get("", response_model=List[AuthorDetailResponse])
async def get_all_authors(session: Session = Depends(get_db)):
    """取得所有作者（包含文章和評論）"""
    try:
        # 使用 ORM 方式載入作者及其關聯的文章和評論
        stmt = select(Author).options(
            selectinload(Author.posts),                                # 預載入文章
            selectinload(Author.comments).joinedload(Comment.post)     # 預載入評論及其對應文章
        ).order_by(Author.name.asc())
        
        result = session.execute(stmt)
        authors = result.scalars().all()

        logger.info(f"成功獲取作者列表: {len(authors)} 位作者（包含關聯資料）")
        
        # 記錄每位作者的文章和評論數量
        for author in authors:
            logger.debug(f"作者 '{author.name}': {len(author.posts)} 篇文章, {len(author.comments)} 個評論")
        
        # 使用手動組合資料的方式，提供更大的彈性
        response_data = []
        for author in authors:
            author_data = {
                "id": author.id,
                "name": author.name,
                "email": author.email,
                "posts": [
                    {
                        "id": post.id,
                        "slug": post.slug,
                        "title": post.title,
                        "likes": post.likes
                    } for post in author.posts
                ],
                "comments": [
                    {
                        "id": comment.id,
                        "content": comment.content,
                        "post_title": comment.post.title,  # 從關聯取得
                        "post_slug": comment.post.slug     # 從關聯取得
                    } for comment in author.comments
                ]
            }
            # 透過 Pydantic 驗證資料結構
            response_data.append(AuthorDetailResponse.model_validate(author_data))
        
        return response_data
        
    except Exception as e:
        logger.error(f"獲取作者列表時發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者列表時發生錯誤: {str(e)}"
        )

@router.get("/{author_name}", response_model=AuthorDetailResponse)
async def get_author_by_name(author_name: str, session: Session = Depends(get_db)):
    """根據名稱取得特定作者詳細資料（包含文章和評論）"""
    try:
        # 使用 ORM 混合策略載入關聯資料
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
            
        logger.info(f"成功獲取作者詳細資料: name='{author.name}', id={author.id}, email='{author.email}'")
        logger.info(f"該作者有 {len(author.posts)} 篇文章, {len(author.comments)} 個評論")
        
        # 手動組合回應資料，確保資料結構符合前端需求
        author_data = {
            "id": author.id,
            "name": author.name,
            "email": author.email,
            "posts": [
                {
                    "id": post.id,
                    "slug": post.slug,
                    "title": post.title,
                    "likes": post.likes
                } for post in author.posts
            ],
            "comments": [
                {
                    "id": comment.id,
                    "content": comment.content,
                    "post_title": comment.post.title,  # 從關聯取得文章標題
                    "post_slug": comment.post.slug     # 從關聯取得文章 slug
                } for comment in author.comments
            ]
        }
        
        # 透過 Pydantic 驗證並轉換為標準格式
        return AuthorDetailResponse.model_validate(author_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"獲取作者詳細資料時發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者詳細資料時發生錯誤: {str(e)}"
        )

@router.get("/id/{author_id}", response_model=AuthorDetailResponse)
async def get_author_by_id(author_id: int, session: Session = Depends(get_db)):
    """根據 ID 取得特定作者詳細資料（包含文章和評論）"""
    try:
        # 使用 ORM 混合策略載入關聯資料
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
        
        logger.info(f"成功獲取作者詳細資料: name='{author.name}', id={author.id}, email='{author.email}'")
        logger.info(f"該作者有 {len(author.posts)} 篇文章, {len(author.comments)} 個評論")
        
        # 手動組合回應資料，確保資料結構符合前端需求
        author_data = {
            "id": author.id,
            "name": author.name,
            "email": author.email,
            "posts": [
                {
                    "id": post.id,
                    "slug": post.slug,
                    "title": post.title,
                    "likes": post.likes
                } for post in author.posts
            ],
            "comments": [
                {
                    "id": comment.id,
                    "content": comment.content,
                    "post_title": comment.post.title,  # 從關聯取得文章標題
                    "post_slug": comment.post.slug     # 從關聯取得文章 slug
                } for comment in author.comments
            ]
        }
        
        # 透過 Pydantic 驗證並轉換為標準格式
        return AuthorDetailResponse.model_validate(author_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"根據 ID 獲取作者詳細資料時發生錯誤: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"獲取作者詳細資料時發生錯誤: {str(e)}"
        )