# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from db.engine import engine
from models.base import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    """應用程式生命週期管理"""
    # 啟動時執行
    try:
        print("正在初始化資料庫...")
        Base.metadata.create_all(engine)
        print("資料庫初始化完成")
    except Exception as e:
        print(f"資料庫初始化失敗: {e}")
        raise
    
    yield
    
    # 關閉時執行（可以在這裡添加清理邏輯）
    print("應用程式正在關閉...")
    
app = FastAPI(title="Blog API", version="1.0.0", lifespan=lifespan)

# CORS：視需求收斂 allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers.posts import router as posts_router
app.include_router(posts_router)

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)