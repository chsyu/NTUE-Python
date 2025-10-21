"""
日誌配置模組 - 初階教學最終版（等效簡寫）
提供：
1) 基礎主控台日誌
2) 檔案「固定大小」輪替日誌（RotatingFileHandler）
"""

from __future__ import annotations
import logging
from logging import StreamHandler
from logging.handlers import RotatingFileHandler
from pathlib import Path


def setup_basic_logging(level: int = logging.INFO) -> None:
    """
    只設定主控台輸出（簡單版）
    """
    logging.basicConfig(
        level=level,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        force=True,  # 覆蓋任何既有設定，保證生效
    )


# def setup_rotating_logging(
#     log_filename: str = "app.log",
#     max_bytes: int = 5 * 1024 * 1024,  # 單檔上限 5MB
#     backup_count: int = 5,              # 保留 5 個備份檔（外加目前的 app.log）
#     level: int = logging.INFO,
#     to_console: bool = True,            # 同時輸出到主控台
# ) -> None:
#     """
#     檔案大小輪替日誌配置（含可選主控台輸出）
#     Vercel 相容版本：僅使用主控台輸出，避免檔案系統權限問題
#     """
#     import os
    
#     # 檢查是否在 Vercel 環境中
#     is_vercel = os.getenv("VERCEL") == "1"
    
#     if is_vercel:
#         # Vercel 環境：僅使用主控台輸出
#         logging.basicConfig(
#             level=level,
#             format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
#             datefmt="%Y-%m-%d %H:%M:%S",
#             force=True,
#         )
#         logger = logging.getLogger(__name__)
#         logger.info("日誌系統初始化完成（Vercel 環境 - 僅主控台輸出）")
#         return
    
#     # 本地環境：使用檔案輪替日誌
#     try:
#         # 準備 logs 目錄與檔案路徑
#         log_dir = Path("logs")
#         log_dir.mkdir(exist_ok=True)
#         log_file_path = log_dir / log_filename

#         # 建立共用格式
#         log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
#         date_format = "%Y-%m-%d %H:%M:%S"

#         # 建立 handlers
#         handlers: list[logging.Handler] = []

#         if to_console:
#             console = StreamHandler()
#             handlers.append(console)

#         file_handler = RotatingFileHandler(
#             filename=str(log_file_path),
#             maxBytes=max_bytes,
#             backupCount=backup_count,
#             encoding="utf-8",
#         )
#         handlers.append(file_handler)

#         # 用 basicConfig 一次套用（最簡寫法）
#         logging.basicConfig(
#             level=level,
#             format=log_format,
#             datefmt=date_format,
#             handlers=handlers,
#             force=True,  # 清掉先前 handlers，避免重複輸出
#         )

#         # 初始化訊息
#         logger = logging.getLogger(__name__)
#         logger.info("日誌系統初始化完成")
#         logger.info(f"日誌檔案: {log_file_path.absolute()}")
#         logger.info(f"檔案輪替: 最多 {backup_count} 個檔案，每個最大 {max_bytes/1024/1024:.1f}MB")
#     except Exception as e:
#         # 如果檔案日誌失敗，回退到主控台日誌
#         logging.basicConfig(
#             level=level,
#             format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
#             datefmt="%Y-%m-%d %H:%M:%S",
#             force=True,
#         )
#         logger = logging.getLogger(__name__)
#         logger.warning(f"檔案日誌初始化失敗，使用主控台日誌: {e}")


def get_logger(name: str | None = None) -> logging.Logger:
    """
    取得具名 logger（慣例各模組用 __name__）
    """
    return logging.getLogger(name or __name__)