const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;  // 或其他適當的端口號

// 讀取憑證和私鑰
const options = {
  key: fs.readFileSync('server.key'),  // 憑證共用路徑
  cert: fs.readFileSync('server.cert') // 憑證共用路徑
};

// 提供靜態文件
app.use(express.static(path.join(__dirname, 'dist')));

// 針對根目錄的請求回覆 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 其他所有路徑回傳 404 錯誤頁面
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'));
});


// 啟動 HTTPS 伺服器
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server is running on https://localhost:${PORT}`);
});