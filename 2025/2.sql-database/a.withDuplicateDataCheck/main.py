from fastapi import FastAPI
from contextlib import asynccontextmanager
import logging
from db.init_data import create_tables, init_database
from routers.posts import router as posts_router

# 設定日誌
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """應用程式生命週期事件處理器"""
    # 啟動時執行
    try:
        logger.info("正在檢查資料庫表格...")
        create_tables()
        logger.info("正在檢查資料初始化...")
        init_database()
        logger.info("✅ 應用程式啟動完成！")
        
    except Exception as e:
        logger.error(f"❌ 應用程式初始化失敗: {e}")
        raise
    
    yield
    
    # 關閉時執行（如果需要清理工作）
    logger.info("👋 應用程式正在關閉...")

# 建立 FastAPI 應用程式
app = FastAPI(
    title="Posts API",
    description="一個用於管理文章的 REST API",
    version="1.0.0",
    lifespan=lifespan
)

# 註冊路由器
app.include_router(posts_router)

# 根路徑
@app.get("/")
async def root():
    return {
        "message": "歡迎使用 Posts API",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# 健康檢查端點
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)