from pydantic import BaseModel, ConfigDict
from typing import List
from .comments import CommentOut

class PostOut(BaseModel):
    # 支援 ORM 模式
    model_config = ConfigDict(from_attributes=True)  
    
    id: int
    slug: str
    title: str
    author: str          # 名稱
    content: str
    likes: int
    comments: List[CommentOut] = []
