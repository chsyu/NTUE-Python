from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from firebase_auth import init_firebase, require_firebase_token
from schemas import Post
from posts import posts

# 初始化Firebase
try:
    init_firebase()
except Exception as e:
    print(f"警告: Firebase初始化失敗: {e}")
    print("請確保設置了FIREBASE_CREDENTIALS_PATH環境變量")

app = FastAPI(
    title="Firebase Auth API",
    description="使用Firebase認證保護的POST資料API",
    version="1.0.0"
)

# CORS設置（允許前端訪問）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生產環境應設置具體的域名
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/posts", response_model=List[Post])
async def list_posts(token_payload: dict = Depends(require_firebase_token)):
    """取得所有文章（需要 Firebase ID Token）"""
    return posts


@app.get("/post/{slug}", response_model=Post)
async def get_post(slug: str, token_payload: dict = Depends(require_firebase_token)):
    """依 slug 取得單篇文章（需要 Firebase ID Token）"""
    for post in posts:
        if post["slug"] == slug:
            return post
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")


@app.get("/")
async def root():
    return {
        "message": "Firebase Posts API",
        "version": "1.0.0",
        "description": "前端使用 Firebase 登入，後端驗證 ID Token 後提供 posts 資料",
        "endpoints": {
            "posts": "/posts - 取得所有文章（需要 Firebase ID Token）",
            "post": "/post/{slug} - 取得單篇文章（需要 Firebase ID Token）",
            "docs": "/docs - API 文檔"
        },
        "authentication": {
            "description": "使用 Authorization: Bearer <firebase_id_token>",
            "note": "後端使用 Firebase Admin SDK 驗證 token"
        }
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", port=5000, reload=True)
