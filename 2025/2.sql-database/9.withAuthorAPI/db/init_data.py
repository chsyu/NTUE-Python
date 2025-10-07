"""資料庫初始化模組 - 支援 Author, Post, Comment 三表關聯"""
import logging
from sqlalchemy.orm import Session

from .engine import engine
from models import Author, Post, Comment
from data.init_authors import authors as init_authors_data
from data.init_posts import posts as init_posts_data

logger = logging.getLogger(__name__)

def init_database():
    """初始化整個資料庫（簡化版 - 測試用）"""
    with Session(engine) as session:
        # 簡單檢查：只要任一表格有資料就跳過
        existing_authors = session.query(Author).count()
        existing_posts = session.query(Post).count()
        existing_comments = session.query(Comment).count()
        
        total_records = existing_authors + existing_posts + existing_comments
        
        if total_records > 0:
            logger.info(f"跳過資料初始化 (已有 {total_records} 筆資料)")
            return
        
        logger.info("開始匯入測試資料...")
        
        try:
            # 第一步：匯入所有作者
            for author_data in init_authors_data:
                author = Author(
                    name=author_data["name"],
                    email=author_data["email"]
                )
                session.add(author)
            
            session.commit()  # 提交作者資料
            
            # 第二步：建立作者名稱到 ID 的對應表
            author_mapping = {}
            for author in session.query(Author).all():
                author_mapping[author.name] = author.id
            
            # 第三步：匯入所有文章
            for post_data in init_posts_data:
                # 找到對應的作者 ID
                author_id = author_mapping[post_data["author"]]
                
                post = Post(
                    slug=post_data["slug"],
                    title=post_data["title"],
                    content=post_data["content"],
                    likes=post_data["likes"],
                    author_id=author_id  # 建立外鍵關聯
                )
                session.add(post)
            
            session.commit()  # 提交文章資料
            
            # 第四步：建立文章 slug 到 ID 的對應表
            post_mapping = {}
            for post in session.query(Post).all():
                post_mapping[post.slug] = post.id
            
            # 第五步：匯入所有評論
            comment_count = 0
            for post_data in init_posts_data:
                post_id = post_mapping[post_data["slug"]]
                
                for comment_data in post_data["comments"]:
                    # 找到評論作者的 ID
                    author_id = author_mapping[comment_data["author"]]
                    
                    comment = Comment(
                        content=comment_data["content"],
                        post_id=post_id,    # 外鍵：這個評論屬於哪篇文章
                        author_id=author_id  # 外鍵：這個評論是誰寫的
                    )
                    session.add(comment)
                    comment_count += 1
            
            session.commit()  # 提交評論資料
            
            logger.info(f"✅ 成功匯入: {len(init_authors_data)} 作者, {len(init_posts_data)} 文章, {comment_count} 評論")
            
        except Exception as e:
            logger.error(f"資料匯入失敗: {e}")
            raise

def create_tables():
    """建立資料庫表格"""
    from models.base import Base
    from models import Author, Post, Comment
    
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("資料庫表格準備完成")
    except Exception as e:
        logger.error(f"資料庫表格建立失敗: {e}")
        raise