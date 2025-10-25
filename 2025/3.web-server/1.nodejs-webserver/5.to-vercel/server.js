const express = require("express");
const path = require("path");

const app = express();

// 提供靜態文件
app.use(express.static(path.join(__dirname, "dist")));

// 其他所有路徑回傳 404 錯誤頁面
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "dist", "404.html"));
});

// 匯出 app 供 Vercel 使用
module.exports = app;
