const express = require("express");
const path = require("path");

const app = express();

// 回覆index.html, style.css
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, "style.css"));
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
