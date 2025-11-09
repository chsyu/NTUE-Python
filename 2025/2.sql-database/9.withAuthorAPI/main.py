from fastapi import FastAPI
from contextlib import asynccontextmanager

from db.init_data import create_tables, init_database, save_tables
from routers.posts import router as posts_router
from routers.authors import router as authors_router
from config.logging_config import setup_rotating_logging, get_logger

# 設定日誌系統（檔案輪替版本）
setup_rotating_logging() 
logger = get_logger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """應用程式生命週期管理"""
    # 啟動時執行
    try:
        logger.info("� 啟動應用程式...")
        create_tables()
        init_database()
        logger.info("✅ 應用程式啟動完成")
        save_tables()
        logger.info("✅ 資料庫表格保存完成")
        
    except Exception as e:
        logger.error(f"❌ 應用程式初始化失敗: {e}")
        raise
    
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
    return {"status": "healthy", "version": "simple"}

if __name__ == "__main__":
    import uvicorn
    
    # 重要：使用我們的日誌配置讓 uvicorn 日誌寫入檔案
    uvicorn.run(
        app, 
        host="127.0.0.1", 
        port=5000
    )