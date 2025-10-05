# main.py
import uvicorn
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from posts import posts  # 你的資料來源：list[dict]，鍵為 id/slug/title/author/content

app = FastAPI()

# CORS：視需求收斂 allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Post(BaseModel):
    # 支援 ORM 模式
    model_config = ConfigDict(from_attributes=True)  
    
    id: int
    slug: str
    title: str
    author: str
    content: str

# -----------------------------
# 路由：帶 response_model，強制輸出型態/結構
# -----------------------------
@app.get("/api/posts", response_model=List[Post])
def list_posts():
    return [Post.model_validate(p) for p in posts]

@app.get("/api/posts/{slug}", response_model=Post)
def get_post(slug: str):
    for post in posts:
        if post["slug"] == slug:
            return Post.model_validate(post)
    return {"error": "Post not found"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)