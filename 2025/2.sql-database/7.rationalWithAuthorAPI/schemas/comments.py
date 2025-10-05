from pydantic import BaseModel, Field

class CommentOut(BaseModel):
    id: int
    author: str = Field(min_length=1)   # 回傳名稱（而非 author_id）
    content: str

    class Config:
        from_attributes = True