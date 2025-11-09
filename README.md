# NTUE-Python

- This course includes python, react, and docker

本課程聚焦於 Python 程式設計與全端開發流程，從基礎語法、資料處理，到前後端整合與 API 交流。課堂也安排 React 前端練習與 Docker 部署示範，協助學生透過實作理解完整開發生命週期。

## 課程內容概覽
- `2025/1.blog-example`：以部落格專案引導學生練習前後端協作，熟悉 FastAPI、React 與資料渲染流程。
- `2024` 與過往年度資料夾涵蓋基礎語法、資料分析、爬蟲、測試、自動化等主題，配合實際範例循序漸進提升技能。
- 專題內容包含 Restful API 設計、TailwindCSS 版型、Docker 化部署與雲端發布，貼近實務開發情境。

## 範例程式碼
以下程式節錄自 `2025/1.blog-example/1.frontend-backend-codes/backend-render/posts.py`，示範如何整理後端文章列表並輸出標題：

```python
from typing import List, Dict

from posts import posts  # 與 posts.py 放在同一資料夾即可匯入


def list_post_titles(items: List[Dict[str, str]]) -> List[str]:
    return [item["title"] for item in items]


if __name__ == "__main__":
    for title in list_post_titles(posts):
        print(title)
```

## Course Materials
[上課教材](https://drive.google.com/drive/folders/1RROhGXXTxC4N_7W6XYZw99kd649Ui9DV?fbclid=IwAR1jT4BrnzBFrgshGb5txAzNjRCcGsETAIy_3Lc2ZQhu4k-bz4tN9P12YqA)
