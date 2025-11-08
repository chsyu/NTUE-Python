# Firebase 服務帳戶憑證設定指南

本指南僅涵蓋後端驗證 Firebase ID Token 所需的最小配置：取得服務帳戶 JSON 檔案，並設定 `FIREBASE_CREDENTIALS_PATH`。

## 1) 取得服務帳戶 JSON

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 進入你的專案 → 點擊齒輪圖示「專案設定」（Project settings）
3. 切換到「服務帳戶」（Service accounts）標籤
4. 選擇「Firebase Admin SDK」
5. 點擊「產生新的私密金鑰」（Generate new private key）→ 下載 JSON 憑證
6. 將下載的 JSON 放到專案目錄（或你偏好的安全路徑）

建議將檔案重新命名為：`firebase-service-account.json`

## 2) 設定環境變數

建立 `.env` 檔案（若尚未建立）：

```bash
cp .env.example .env
```

編輯 `.env`，設定服務帳戶 JSON 路徑：

```env
FIREBASE_CREDENTIALS_PATH=./firebase-service-account.json
```

可使用絕對路徑，例如：

```env
FIREBASE_CREDENTIALS_PATH=/Users/yourname/projects/auth-firebase/firebase-service-account.json
```

## 3) 安全注意事項

- 請勿將 `firebase-service-account.json` 提交到 Git 倉庫（已在 `.gitignore` 中忽略）
- 憑證具有管理員權限，請妥善保存；如有外洩，請立刻在 Console 撤銷並重發
- 生產環境建議使用安全的祕密管理方式（如：雲端秘鑰管理服務或安全的檔案權限）

## 4) 驗證設定

1. 確認 `.env` 中的 `FIREBASE_CREDENTIALS_PATH` 指向正確檔案
2. 啟動後端服務：
   ```bash
   uvicorn main:app --reload
   ```
3. 如能正常啟動，代表憑證載入成功；若失敗請檢查：
   - 路徑是否正確
   - JSON 是否完整可讀
   - 檔案權限是否允許後端讀取

## 5) 前端（僅供參考）

前端請使用 Firebase SDK 完成登入/註冊，並在呼叫後端 secure API 時於 HTTP Header 帶上：

```
Authorization: Bearer <firebase_id_token>
```

後端會使用 Firebase Admin SDK 驗證此 ID Token。

## 相關資源

- Firebase Admin SDK 設定: https://firebase.google.com/docs/admin/setup
- Firebase Authentication: https://firebase.google.com/docs/auth
- Firebase Console: https://console.firebase.google.com/
