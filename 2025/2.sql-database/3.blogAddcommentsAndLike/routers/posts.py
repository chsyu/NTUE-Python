from fastapi import APIRouter
from typing import List
from db.posts import posts 
from schemas.posts import Post, Comment

router = APIRouter(
    prefix='/api',
    tags=['blog posts']
)

# -----------------------------
# 路由：帶 response_model，強制輸出型態/結構
# -----------------------------
@router.get("/posts", response_model=List[Post])
def list_posts():
    return [Post.model_validate(p) for p in posts]

@router.get("/posts/{slug}", response_model=Post)
def get_post(slug: str):
    for post in posts:
        if post["slug"] == slug:
            return Post.model_validate(post)
    return {"error": "Post not found"}