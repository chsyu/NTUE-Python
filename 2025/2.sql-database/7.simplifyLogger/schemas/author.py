from pydantic import BaseModel, ConfigDict
from typing import Optional

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