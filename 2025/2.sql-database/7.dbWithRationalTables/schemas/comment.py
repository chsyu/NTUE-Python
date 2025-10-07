from pydantic import BaseModel, ConfigDict
from typing import Optional

class CommentBase(BaseModel):
    """Comment 基礎 schema"""
    content: str

class CommentCreate(CommentBase):
    """建立 Comment 時使用的 schema"""
    post_id: int
    author_id: int

class CommentResponse(CommentBase):
    """回傳 Comment 資料時使用的 schema"""
    id: int
    post_id: int
    author_id: int
    
    model_config = ConfigDict(from_attributes=True)

# 用於嵌套在 Post 中的簡化 Comment schema
class CommentInPost(BaseModel):
    """在 Post 中顯示的簡化 Comment schema"""
    id: int
    content: str
    author_name: str  # 這個會在 API 中手動設定
    
    model_config = ConfigDict(from_attributes=True)