from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class AuthorBase(BaseModel):
    """Author 基礎 schema"""
    name: str
    email: str

class AuthorCreate(AuthorBase):
    """建立 Author 時使用的 schema"""
    pass

class AuthorResponse(AuthorBase):
    """回傳 Author 資料時使用的 schema"""
    id: int
    
    model_config = ConfigDict(from_attributes=True)

# 用於作者詳細頁面的嵌套 schema
class PostInAuthor(BaseModel):
    """在作者詳細資料中顯示的文章資訊"""
    id: int
    slug: str
    title: str
    likes: int
    
    model_config = ConfigDict(from_attributes=True)

class CommentInAuthor(BaseModel):
    """在作者詳細資料中顯示的評論資訊"""
    id: int
    content: str
    post_title: str  # 評論所屬文章的標題
    post_slug: str   # 評論所屬文章的 slug
    
    model_config = ConfigDict(from_attributes=True)
    
    @classmethod
    def model_validate(cls, obj):
        """自訂驗證方法，從 Comment 物件建立"""
        return cls(
            id=obj.id,
            content=obj.content,
            post_title=obj.post.title,
            post_slug=obj.post.slug
        )

class AuthorDetailResponse(AuthorBase):
    """作者詳細資料回應 schema"""
    id: int
    posts: List[PostInAuthor] = []
    comments: List[CommentInAuthor] = []
    
    model_config = ConfigDict(from_attributes=True)
    
    @classmethod
    def model_validate(cls, obj):
        """自訂驗證方法，處理關聯資料"""
        return cls(
            id=obj.id,
            name=obj.name,
            email=obj.email,
            posts=[PostInAuthor.model_validate(post) for post in obj.posts],
            comments=[CommentInAuthor.model_validate(comment) for comment in obj.comments]
        )
    