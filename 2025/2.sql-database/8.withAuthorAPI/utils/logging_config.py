"""
日誌配置模組
集中管理所有日誌相關的設定
"""
import logging
from typing import List


# 常見的吵雜模組列表
NOISY_LOGGERS = [
    'sqlalchemy.engine',
    'sqlalchemy.pool', 
    'sqlalchemy.dialects',
    'uvicorn.access',
    'asyncio',
    'urllib3.connectionpool',
]

# 日誌格式配置
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
LOG_DATE_FORMAT = '%Y-%m-%d %H:%M:%S'


def setup_logging(
    level: int = logging.INFO,
    suppress_loggers: List[str] = None,
    format_string: str = None,
    date_format: str = None
) -> logging.Logger:
    """
    設定應用程式日誌
    
    Args:
        level: 主要日誌等級
        suppress_loggers: 要抑制的 logger 列表
        format_string: 日誌格式
        date_format: 日期格式
        
    Returns:
        應用程式主 logger
    """
    # 使用預設值
    if suppress_loggers is None:
        suppress_loggers = NOISY_LOGGERS
    if format_string is None:
        format_string = LOG_FORMAT
    if date_format is None:
        date_format = LOG_DATE_FORMAT
    
    # 基礎配置
    logging.basicConfig(
        level=level,
        format=format_string,
        datefmt=date_format
    )
    
    # 強制設定吵雜模組的等級
    for logger_name in suppress_loggers:
        target_logger = logging.getLogger(logger_name)
        target_logger.setLevel(logging.WARNING)
        # 確保不會被其他設定覆蓋
        target_logger.disabled = False
    
    return logging.getLogger(__name__)


def get_app_logger(name: str = __name__) -> logging.Logger:
    """獲取應用程式 logger"""
    return logging.getLogger(name)