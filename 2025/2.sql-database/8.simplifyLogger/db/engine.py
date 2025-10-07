from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

# SQLite 資料庫設定
SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db"

# 建立引擎
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
    echo=False  # 關閉直接輸出，改用日誌系統控制
)

# Dependency 函式，用於獲取資料庫 session
def get_db():
    with Session(engine) as session:
        yield session