from fastapi import APIRouter, HTTPException
from typing import List
from db.posts import get_all_posts_with_comments, get_post_with_comments
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
    """獲取所有文章及其留言 (模擬 JOIN 查詢)"""
    posts_with_comments = get_all_posts_with_comments()
    return [Post.model_validate(p) for p in posts_with_comments]

@router.get("/posts/{slug}", response_model=Post)
def get_post(slug: str):
    """根據 slug 獲取單一文章及其留言 (模擬 JOIN 查詢)"""
    post_with_comments = get_post_with_comments(slug=slug)
    if not post_with_comments:
        raise HTTPException(status_code=404, detail="Post not found")
    return Post.model_validate(post_with_comments)