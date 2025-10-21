from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool
import os

# PostgreSQL 資料庫設定
# 優先使用環境變數，如果沒有則使用預設值
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://neondb_owner:npg_V0JWLUqO3oXk@ep-rough-sea-adw3s1z3-pooler.c-2.us-east-1.aws.neon.tech/neondb"
)

# 檢查是否在 Vercel 環境中
is_vercel = os.getenv("VERCEL") == "1"

if is_vercel:
    # Vercel 環境：使用適合 serverless 的連接池設定
    engine = create_engine(
        DATABASE_URL,
        echo=False,  # 關閉 SQL 查詢日誌，避免過多輸出
        poolclass=StaticPool,  # 使用靜態連接池
        pool_pre_ping=True,  # 連接前檢查連接是否有效
        pool_recycle=300,  # 5分鐘回收連接
    )
else:
    # 本地環境：使用預設設定
    engine = create_engine(
        DATABASE_URL,
        echo=False  # 關閉 SQL 查詢日誌，避免過多輸出
    )

# Dependency 函式，用於獲取資料庫 session
def get_db():
    with Session(engine) as session:
        yield session