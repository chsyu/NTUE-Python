from pydantic import BaseModel


class Post(BaseModel):
    id: int
    slug: str
    title: str
    author: str
    content: str
