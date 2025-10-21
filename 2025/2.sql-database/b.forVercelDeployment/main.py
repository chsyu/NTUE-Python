from fastapi import FastAPI
from contextlib import asynccontextmanager
import os

from db.init_data import create_tables, init_database
from routers.posts import router as posts_router
from routers.authors import router as authors_router
from config.logging_config import setup_basic_logging, get_logger

# 設定日誌系統（基礎版本）
setup_basic_logging() 
logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """應用程式生命週期管理 - Vercel 相容版本"""
    # 啟動時執行
    try:
        logger.info("🚀 啟動應用程式...")
        
        # 檢查是否在 Vercel 環境中
        is_vercel = os.getenv("VERCEL") == "1"
        
        if not is_vercel:
            # 只在非 Vercel 環境中執行資料庫初始化
            logger.info("本地環境：執行資料庫初始化...")
            create_tables()
            init_database()
        else:
            # Vercel 環境：僅建立表格，不初始化資料
            logger.info("Vercel 環境：僅建立資料庫表格...")
            create_tables()
        
        logger.info("✅ 應用程式啟動完成")
        
    except Exception as e:
        logger.error(f"❌ 應用程式初始化失敗: {e}")
        # 在 Vercel 環境中，不要讓初始化失敗阻止應用程式啟動
        if not os.getenv("VERCEL") == "1":
            raise
        else:
            logger.warning("Vercel 環境：忽略初始化錯誤，繼續啟動")
    
    yield
    
    # 關閉時執行
    logger.info("👋 應用程式關閉")

# 建立 FastAPI 應用程式
app = FastAPI(
    title="Posts API - 簡化教學版",
    description="學習關聯資料庫的簡化版 REST API",
    version="1.0.0-simple",
    lifespan=lifespan
)

# 註冊路由
app.include_router(posts_router)
app.include_router(authors_router)

# 根路徑
@app.get("/")
async def root():
    return {
        "message": "歡迎使用 Posts API 簡化教學版",
        "purpose": "學習關聯資料庫概念",
        "docs": "/docs"
    }

# 健康檢查
@app.get("/health")
async def health_check():
    import os
    return {
        "status": "healthy", 
        "version": "simple",
        "environment": "vercel" if os.getenv("VERCEL") == "1" else "local"
    }

# 簡單的測試端點，不依賴資料庫
@app.get("/test")
async def test_endpoint():
    return {"message": "API is working", "timestamp": "2024-01-01"}

if __name__ == "__main__":
    import uvicorn
    
    # 重要：使用我們的日誌配置讓 uvicorn 日誌寫入檔案
    uvicorn.run(
        app, 
        host="127.0.0.1", 
        port=5000
    )