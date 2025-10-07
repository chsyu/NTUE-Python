"""
測試 __name__ 的值
"""
from utils.logging_config import get_app_logger

print(f"在 test_module.py 中，__name__ = {__name__}")

# 建立這個模組的 logger
logger = get_app_logger(__name__)

def test_function():
    """測試函數"""
    print(f"在 test_function 中，__name__ 仍然是 = {__name__}")
    logger.info("這是來自 test_module 的日誌訊息")
    
if __name__ == "__main__":
    print("這個檔案被直接執行")
    test_function()