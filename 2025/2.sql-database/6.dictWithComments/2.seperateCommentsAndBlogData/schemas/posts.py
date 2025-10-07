from pydantic import BaseModel, ConfigDict
from typing import List

class Comment(BaseModel):
    # 支援 ORM 模式
    model_config = ConfigDict(from_attributes=True)
    
    author: str
    content: str

class Post(BaseModel):
    # 支援 ORM 模式
    model_config = ConfigDict(from_attributes=True)  
    
    id: int
    slug: str
    title: str
    author: str
    content: str
    likes: int
    comments: List[Comment]
