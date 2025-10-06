from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from .comment import CommentInPost

class PostBase(BaseModel):
    """Post 基礎 schema"""
    slug: str
    title: str
    content: str
    likes: int = 0

class PostCreate(PostBase):
    """建立 Post 時使用的 schema"""
    author_id: int

class PostUpdate(BaseModel):
    """更新 Post 時使用的 schema"""
    slug: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    likes: Optional[int] = None
    author_id: Optional[int] = None

class PostResponse(PostBase):
    """回傳 Post 資料時使用的 schema"""
    id: int
    author_id: int
    author_name: str  # 這個會在 API 中手動設定
    comments: List[CommentInPost] = []
    
    model_config = ConfigDict(from_attributes=True)

class PostListResponse(BaseModel):
    """回傳 Post 列表時使用的 schema"""
    posts: List[PostResponse]
    total: int