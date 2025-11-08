import firebase_admin
from firebase_admin import credentials, auth
import os
from dotenv import load_dotenv
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

# 初始化Firebase Admin SDK
_firebase_app = None

security = HTTPBearer()


def init_firebase():
    """初始化Firebase Admin SDK"""
    global _firebase_app
    if _firebase_app is None:
        cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
        if not cred_path:
            raise ValueError("FIREBASE_CREDENTIALS_PATH環境變量未設置")
        
        if not os.path.exists(cred_path):
            raise FileNotFoundError(f"Firebase憑證文件不存在: {cred_path}")
        
        cred = credentials.Certificate(cred_path)
        _firebase_app = firebase_admin.initialize_app(cred)
    return _firebase_app


def verify_firebase_token(id_token: str):
    """驗證Firebase ID Token並返回解碼後的token資訊"""
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise ValueError(f"無效的Firebase token: {str(e)}")


def require_firebase_token(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    確認 Authorization: Bearer <firebase_id_token> 有效，回傳解碼後的 payload
    """
    token = credentials.credentials
    try:
        return verify_firebase_token(token)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
            headers={"WWW-Authenticate": "Bearer"},
        )
