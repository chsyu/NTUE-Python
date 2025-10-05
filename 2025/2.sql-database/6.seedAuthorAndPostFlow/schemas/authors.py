from pydantic import BaseModel, Field

class AuthorOut(BaseModel):
    id: int
    name: str = Field(min_length=1, max_length=100)

    class Config:
        from_attributes = True