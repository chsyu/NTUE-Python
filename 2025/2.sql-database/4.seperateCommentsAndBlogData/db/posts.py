# Posts 資料 (模擬 posts 表)
posts = [
    {
        "id": 1,
        "slug": "introduction-to-python",
        "title": "Python 入門指南",
        "author": "Alice",
        "content": "這篇文章介紹 Python 的基本語法、資料型態與常用函式，並提供簡單範例程式碼，幫助初學者快速入門，建立良好的開發基礎。",
        "likes": 42
    },
    {
        "id": 2,
        "slug": "advanced-python-tips",
        "title": "進階 Python 技巧",
        "author": "Bob",
        "content": "這篇文章包含裝飾器、生成器、協程、型別提示、錯誤處理等進階用法，讓你在開發時能寫出更簡潔、可讀性更高且效能更佳的 Python 程式。",
        "likes": 78
    },
    {
        "id": 3,
        "slug": "javascript-basics",
        "title": "JavaScript 基礎",
        "author": "Carol",
        "content": "本篇介紹瀏覽器端 JavaScript 的基本概念，包括變數宣告、事件監聽、DOM 操作與非同步程式設計，幫助讀者在前端開發打下穩固基礎。",
        "likes": 56
    },
    {
        "id": 4,
        "slug": "web-api-design",
        "title": "Web API 設計原則",
        "author": "David",
        "content": "分享 RESTful API 設計與版本管理策略，討論資源命名、狀態碼、認證與授權，並舉例如何規劃良好的資料回應格式，提高系統可維護性與擴充性。",
        "likes": 93
    },
    {
        "id": 5,
        "slug": "css-flexbox-layout",
        "title": "CSS Flexbox 佈局技巧",
        "author": "Eva",
        "content": "深入介紹 Flexbox 的核心概念與實用範例，包括主軸方向、對齊方式、彈性伸縮、排列順序與常見版型，讓你的前端排版更快速且彈性。",
        "likes": 67
    },
    {
        "id": 6,
        "slug": "react-hooks-guide",
        "title": "React Hooks 全攻略",
        "author": "Frank",
        "content": "如何使用 useState、useEffect 與自訂 Hooks 來管理狀態、生命週期及複用邏輯，並提供最佳實務建議，讓你的 React 應用更現代化與易於維護。",
        "likes": 89
    },
    {
        "id": 7,
        "slug": "tailwindcss-styling",
        "title": "TailwindCSS 快速上手",
        "author": "Grace",
        "content": "用實例教你用 Tailwind 建立美觀介面，包含實用類別、版面配置、客製化主題與元件設計，顯著提升開發速度並保持一致的設計風格。",
        "likes": 72
    },
    {
        "id": 8,
        "slug": "database-optimization",
        "title": "資料庫優化秘訣",
        "author": "Henry",
        "content": "探討索引設計、查詢快取、垂直與水平分割等最佳實務，幫助你在大型系統中保持高效能並減少瓶頸，提高資料庫穩定度與擴展性。",
        "likes": 105
    },
    {
        "id": 9,
        "slug": "docker-deployment",
        "title": "Docker 部署入門",
        "author": "Ivy",
        "content": "學習如何將應用容器化並部署到雲端，涵蓋 Dockerfile、映像檔管理、網路設定與多容器協作，讓你的部署流程更一致、快速且可靠。",
        "likes": 84
    },
    {
        "id": 10,
        "slug": "fastapi-tutorial",
        "title": "FastAPI 實戰教學",
        "author": "Jack",
        "content": "一步步建構快速、高效能的 API 服務，講解路由、請求驗證、非同步處理、回傳格式及認證授權，幫助你掌握現代 Python 後端框架。",
        "likes": 96
    }
]

# Comments 資料 (模擬 comments 表，包含外鍵 post_id)
comments = [
    # Post 1 的留言
    {"id": 1, "post_id": 1, "author": "Bob", "content": "很棒的入門教學！"},
    {"id": 2, "post_id": 1, "author": "Carol", "content": "程式碼範例很清楚"},
    {"id": 3, "post_id": 1, "author": "David", "content": "初學者必讀"},
    
    # Post 2 的留言
    {"id": 4, "post_id": 2, "author": "Alice", "content": "裝飾器部分講解得很詳細"},
    {"id": 5, "post_id": 2, "author": "Eva", "content": "協程的範例很實用"},
    
    # Post 3 的留言
    {"id": 6, "post_id": 3, "author": "Frank", "content": "DOM 操作的說明很清楚"},
    {"id": 7, "post_id": 3, "author": "Grace", "content": "非同步程式設計部分有助理解"},
    
    # Post 4 的留言
    {"id": 8, "post_id": 4, "author": "Henry", "content": "RESTful 設計原則整理得很好"},
    {"id": 9, "post_id": 4, "author": "Ivy", "content": "版本管理策略很實用"},
    {"id": 10, "post_id": 4, "author": "Jack", "content": "認證授權的部分可以再詳細一點"},
    
    # Post 5 的留言
    {"id": 11, "post_id": 5, "author": "Carol", "content": "Flexbox 範例很實用"},
    {"id": 12, "post_id": 5, "author": "Alice", "content": "對齊方式的說明幫助很大"},
    
    # Post 6 的留言
    {"id": 13, "post_id": 6, "author": "Grace", "content": "自訂 Hooks 的部分很有啟發性"},
    {"id": 14, "post_id": 6, "author": "Bob", "content": "useState 範例很清楚"},
    
    # Post 7 的留言
    {"id": 15, "post_id": 7, "author": "Eva", "content": "客製化主題的部分很有用"},
    {"id": 16, "post_id": 7, "author": "David", "content": "實例很豐富"},
    
    # Post 8 的留言
    {"id": 17, "post_id": 8, "author": "Ivy", "content": "索引設計的建議很實用"},
    {"id": 18, "post_id": 8, "author": "Jack", "content": "查詢優化技巧幫助很大"},
    {"id": 19, "post_id": 8, "author": "Alice", "content": "分割策略很詳細"},
    
    # Post 9 的留言
    {"id": 20, "post_id": 9, "author": "Henry", "content": "Dockerfile 範例很清楚"},
    {"id": 21, "post_id": 9, "author": "Bob", "content": "多容器協作的部分很有用"},
    
    # Post 10 的留言
    {"id": 22, "post_id": 10, "author": "David", "content": "FastAPI 教學很完整"},
    {"id": 23, "post_id": 10, "author": "Carol", "content": "非同步處理的說明很清楚"},
    {"id": 24, "post_id": 10, "author": "Frank", "content": "認證授權部分很實用"}
]

# 查詢函數：根據 post_id 獲取相關留言 (模擬 SQL JOIN 查詢)
def get_comments_by_post_id(post_id: int):
    """模擬 SQL: SELECT * FROM comments WHERE post_id = ?"""
    return [comment for comment in comments if comment["post_id"] == post_id]

# 查詢函數：獲取包含留言的完整文章資料
def get_post_with_comments(slug: str = None):
    """模擬 SQL JOIN 查詢，返回包含留言的文章資料"""
    # 找到指定的文章
    target_post = next((post for post in posts if post["slug"] == slug), None)
    
    if not target_post:
        return None
    
    # 獲取該文章的留言
    post_comments = get_comments_by_post_id(target_post["id"])
    
    # 組合完整資料
    return {
        **target_post,
        "comments": [{"author": c["author"], "content": c["content"]} for c in post_comments]
    }

# 查詢函數：獲取所有文章及其留言
def get_all_posts_with_comments():
    """模擬 SQL JOIN 查詢，返回所有文章及其留言"""
    result = []
    for post in posts:
        post_comments = get_comments_by_post_id(post["id"])
        result.append({
            **post,
            "comments": [{"author": c["author"], "content": c["content"]} for c in post_comments]
        })
    return result