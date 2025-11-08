# Firebase Auth API

使用 FastAPI 與 Firebase Authentication 構建的保護型 Posts API。前端使用 Firebase SDK 實作登入/註冊，取得 ID Token 後呼叫後端取得文章資料。

## 功能特點

- 🔐 Firebase Authentication 整合（後端處理）
- 📝 用戶註冊 API（email/password）
- 🔑 用戶登入 API（email/password）
- 🎫 直接使用 Firebase ID Token 認證（無需 JWT）
- 👤 個人資料 API（讀取和更新）
- 💾 SQLite 資料庫存儲用戶資料
- 📚 自動生成的 API 文檔（Swagger UI）

## 安裝步驟

### 1. 安裝依賴

```bash
pip install -r requirements.txt
```

### 2. 配置 Firebase

詳細步驟請參考 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) 文件。

簡要步驟：
1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 創建新專案或選擇現有專案
3. 啟用 Authentication（使用 Email/Password 方式）
4. 前往「專案設定」>「服務帳戶」標籤，下載服務帳戶 JSON 文件
5. 前往「專案設定」>「一般」標籤，複製 Web API Key

### 3. 設置環境變量

複製 `.env.example` 並創建 `.env` 文件：

```bash
cp .env.example .env
```

編輯 `.env` 文件，設置以下變量：

```env
# Firebase配置
FIREBASE_CREDENTIALS_PATH=./firebase-service-account.json
FIREBASE_API_KEY=your-firebase-api-key-here

# JWT配置
JWT_SECRET_KEY=your-very-secret-key-change-this-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# 資料庫配置
DATABASE_URL=sqlite:///./users.db
```

### 4. 運行應用

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

應用將在 `http://localhost:8000` 啟動

## API 文檔

啟動應用後，訪問以下網址查看 API 文檔：

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API 端點

### 1. 登入（改由前端執行） `/login (前端)` (POST)

此後端不提供登入；請改用前端 Firebase SDK 進行登入，並把 ID Token 放到 Authorization header 後呼叫 /profile。

**請求體：**
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

**響應：**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "uid": "firebase_uid",
    "email": "user@example.com",
    "display_name": "用戶名稱",
    "photo": null,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### 2. 註冊（改由前端執行） `/register (前端)` (POST)

此後端不提供註冊；請改用前端 Firebase SDK 進行註冊，並在登入取得 ID Token 後呼叫 /profile。

**請求體：**
```json
{
  "email": "user@example.com",
  "password": "userpassword",
  "display_name": "用戶名稱（可選）"
}
```

**響應：**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "uid": "firebase_uid",
    "email": "user@example.com",
    "display_name": "用戶名稱",
    "photo": null,
    "created_at": "2024-01-01T00:00:00"
  }
}
```

### 3. 獲取個人資料 `/profile` (GET)

獲取當前登入用戶的個人資料。需要 Firebase ID Token。

**Headers：**
```
Authorization: Bearer <firebase_id_token>
```

**響應：**
```json
{
  "uid": "firebase_uid",
  "email": "user@example.com",
  "display_name": "用戶名稱",
  "photo": null,
  "created_at": "2024-01-01T00:00:00"
}
```

### 4. 更新個人資料 `/profile` (PUT)

更新當前登入用戶的個人資料。需要 Firebase ID Token。

**Headers：**
```
Authorization: Bearer <firebase_id_token>
```

**請求體：**
```json
{
  "display_name": "新名稱（可選）",
  "photo": "data:image/png;base64,iVBORw0KGgoAAAANS..." 
}
```

**注意：** `photo` 欄位應為 base64 編碼的圖片字串（可包含 data URI 前綴，如 `data:image/png;base64,xxx`）

## 認證流程

### 完整流程說明

1. **用戶註冊/登入**：
   - 前端發送 email 和 password 到 `/register (前端)` 或 `/login (前端)` API
   - 後端與 Firebase 通信，驗證或創建用戶
   - 後端從 Firebase 獲取 ID Token 並返回給前端（**不是生成 JWT**）

2. **訪問受保護的 API**：
   - 前端在 HTTP header 中包含 Firebase ID Token：`Authorization: Bearer <firebase_id_token>`
   - 後端使用 Firebase Admin SDK 驗證 token 的有效性
   - 驗證成功後，返回請求的資料

### 為什麼使用 Firebase ID Token 而不是 JWT？

- ✅ **簡化架構**：不需要生成和管理 JWT
- ✅ **安全性**：Firebase 負責 token 的生成、簽名和驗證
- ✅ **標準化**：直接使用 Firebase 的標準認證流程
- ✅ **減少代碼**：不需要 JWT secret key 和相關配置

### 前端使用示例

```javascript
// 1. 註冊新用戶
const register (前端)Response = await fetch('http://localhost:8000/register (前端)', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    display_name: '用戶名稱'
  })
});

const register (前端)Data = await register (前端)Response.json();
const jwtToken = register (前端)Data.access_token; // 保存 JWT token

// 2. 登入（如果已經註冊）
const login (前端)Response = await fetch('http://localhost:8000/login (前端)', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const login (前端)Data = await login (前端)Response.json();
const firebaseToken = login (前端)Data.access_token; // 保存 Firebase ID Token

// 3. 使用 Firebase ID Token 訪問受保護的 API
const profileResponse = await fetch('http://localhost:8000/profile', {
  headers: {
    'Authorization': `Bearer ${firebaseToken}`  // 使用 Firebase ID Token
  }
});

const profile = await profileResponse.json();
```

## 項目結構

```
auth-firebase/
├── main.py              # FastAPI 主應用
├── models.py            # SQLAlchemy 資料模型
├── schemas.py           # Pydantic schemas
├── database.py          # 資料庫配置
├── firebase_auth.py     # Firebase 認證相關（包含 token 驗證）
├── requirements.txt     # Python 依賴
├── .env.example         # 環境變量示例
├── .env                 # 環境變量（需自行創建）
├── FIREBASE_SETUP.md    # Firebase 設定指南
└── README.md            # 本文件
```

## 安全注意事項

1. **生產環境配置**：
   - 修改 `JWT_SECRET_KEY` 為強隨機字串
   - 設置具體的 CORS 允許域名
   - 使用環境變量管理敏感資訊

2. **Firebase 安全規則**：
   - 確保 Firebase 專案設置了適當的安全規則
   - 定期輪換服務帳戶密鑰

3. **HTTPS**：
   - 生產環境必須使用 HTTPS

4. **Token 管理**：
   - Firebase ID Token 有效期為 1 小時
   - 前端應妥善管理 token（考慮使用 httpOnly cookie）
   - Token 過期後需要重新登入獲取新的 token

## 設計特點

本版本使用簡化的認證流程：

- ✅ 前端只調用後端 API，不直接使用 Firebase SDK
- ✅ 後端負責與 Firebase 通信
- ✅ 後端直接返回 Firebase ID Token（不生成 JWT）
- ✅ 後端使用 Firebase Admin SDK 驗證 token
- ✅ 前端使用 Firebase ID Token 訪問受保護的 API
- ✅ 無需管理 JWT secret key，代碼更簡潔

## 授權

MIT License
