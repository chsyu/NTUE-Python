from pydantic import BaseModel, ConfigDict

class Postout(BaseModel):
    # 支援 ORM 模式
    model_config = ConfigDict(from_attributes=True)  
    
    id: int
    slug: str
    title: str
    author: str
    content: str
