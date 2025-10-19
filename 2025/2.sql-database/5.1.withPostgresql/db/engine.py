from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

PGUSER = os.getenv("PGUSER")
PGPASSWORD = os.getenv("PGPASSWORD")
PGHOST = os.getenv("PGHOST")
PGPORT = os.getenv("PGPORT")
PGDATABASE = os.getenv("PGDATABASE")

DATABASE_URL = f"postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}:{PGPORT}/{PGDATABASE}"

engine = create_engine(
    DATABASE_URL,
    # connect_args={"check_same_thread": False},
    echo=False  # 關閉 SQL 查詢日誌，避免過多輸出
)

def get_db():
    """取得資料庫連線的生成器函數"""
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()
