const express = require("express");

const app = express();

// 回覆index.html
app.get('/index.html', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Plain Text Response</title>
        <style>
          .title { color: red; text-align: center;}
          .description { color: blue;}
        </style>
      </head>
      <body>
        <h1 class="title">Hello World</h1>
        <p class="description">This is a plain text response</p>
      </body>
    </html>
  `);
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
