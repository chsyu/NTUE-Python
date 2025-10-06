"""資料庫初始化模組 - 負責建立表格和匯入初始資料"""
import logging
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import Session
from .engine import engine, Base
from models import Author, Post, Comment
from data.init_authors import authors as init_authors_data
from data.init_posts import posts as init_posts_data

# 設定日誌
logger = logging.getLogger(__name__)


def create_tables():
    """檢查並建立需要的資料庫表格（只建立不存在的表格）"""
    try:
        # 匯入所有模型以確保表格被註冊
        from models import Author, Post, Comment
        
        # 只建立不存在的表格，不會影響現有資料
        Base.metadata.create_all(bind=engine)
        logger.info("資料庫表格檢查完成")
        
    except Exception as e:
        logger.error(f"建立資料庫表格時發生錯誤: {e}")
        raise


class DatabaseImporter:
    """跨資料庫相容的高效資料匯入器"""
    
    def __init__(self, session: Session):
        self.session = session
    
    def import_authors_efficiently(self, authors_data: list) -> tuple[int, int]:
        """高效率批次匯入作者資料，避免重複"""
        if not authors_data:
            return 0, 0
            
        # 提取所有需要檢查的名稱和信箱
        names = [author["name"] for author in authors_data]
        emails = [author["email"] for author in authors_data]
        
        # 一次查詢檢查所有可能的重複
        existing_stmt = select(Author.name, Author.email).where(
            or_(Author.name.in_(names), Author.email.in_(emails))
        )
        existing_authors = self.session.execute(existing_stmt).all()
        
        existing_names = {row.name for row in existing_authors}
        existing_emails = {row.email for row in existing_authors}
        
        # 準備新作者列表
        new_authors = []
        imported_count = 0
        
        for author_data in authors_data:
            if (author_data["name"] not in existing_names and 
                author_data["email"] not in existing_emails):
                
                new_authors.append(Author(
                    name=author_data["name"],
                    email=author_data["email"]
                ))
                
                # 更新本地集合，避免同批次重複
                existing_names.add(author_data["name"])
                existing_emails.add(author_data["email"])
                imported_count += 1
        
        # 批次插入所有新作者
        if new_authors:
            self.session.add_all(new_authors)
            self.session.flush()  # 確保資料寫入，但不提交事務
        
        skipped_count = len(authors_data) - imported_count
        return imported_count, skipped_count
    
    def import_posts_efficiently(self, posts_data: list, author_name_to_id: dict) -> tuple[int, int]:
        """高效率批次匯入文章資料"""
        if not posts_data:
            return 0, 0
            
        # 一次查詢檢查所有 slug 重複
        slugs = [post["slug"] for post in posts_data]
        existing_stmt = select(Post.slug).where(Post.slug.in_(slugs))
        existing_slugs = set(self.session.execute(existing_stmt).scalars().all())
        
        # 準備新文章列表
        new_posts = []
        imported_count = 0
        
        for post_data in posts_data:
            if post_data["slug"] not in existing_slugs:
                author_id = author_name_to_id.get(post_data["author"])
                if not author_id:
                    logger.warning(f"找不到作者 '{post_data['author']}'，跳過文章 '{post_data['title']}'")
                    continue
                
                new_posts.append(Post(
                    slug=post_data["slug"],
                    title=post_data["title"],
                    content=post_data["content"],
                    likes=post_data["likes"],
                    author_id=author_id
                ))
                
                existing_slugs.add(post_data["slug"])
                imported_count += 1
        
        # 批次插入所有新文章
        if new_posts:
            self.session.add_all(new_posts)
            self.session.flush()
        
        skipped_count = len(posts_data) - imported_count
        return imported_count, skipped_count
    
    def import_comments_efficiently(self, posts_data: list, author_name_to_id: dict, post_slug_to_id: dict) -> int:
        """高效率匯入評論資料（適用於批次匯入場景）"""
        
        # 收集所有唯一的評論組合
        potential_comments = []
        comment_signatures = set()  # 去除本批次內的重複
        
        for post_data in posts_data:
            post_id = post_slug_to_id.get(post_data["slug"])
            if not post_id:
                continue
            
            for comment_data in post_data["comments"]:
                author_id = author_name_to_id.get(comment_data["author"])
                if not author_id:
                    logger.warning(f"找不到評論作者 '{comment_data['author']}'")
                    continue
                
                # 建立評論簽章以快速檢查本批次內的重複
                signature = (post_id, author_id, comment_data["content"])
                if signature not in comment_signatures:
                    potential_comments.append({
                        "post_id": post_id,
                        "author_id": author_id,
                        "content": comment_data["content"]
                    })
                    comment_signatures.add(signature)
        
        if not potential_comments:
            return 0
        
        # 一次性批次檢查已存在的評論
        existing_comments_conditions = [
            and_(
                Comment.post_id == comment["post_id"],
                Comment.author_id == comment["author_id"],
                Comment.content == comment["content"]
            )
            for comment in potential_comments
        ]
        
        existing_stmt = select(
            Comment.post_id, 
            Comment.author_id, 
            Comment.content
        ).where(or_(*existing_comments_conditions))
        
        existing_results = self.session.execute(existing_stmt).all()
        existing_signatures = {
            (row.post_id, row.author_id, row.content) 
            for row in existing_results
        }
        
        # 準備要插入的新評論（排除已存在的）
        new_comments = []
        for comment in potential_comments:
            signature = (comment["post_id"], comment["author_id"], comment["content"])
            if signature not in existing_signatures:
                new_comments.append(Comment(
                    content=comment["content"],
                    post_id=comment["post_id"],
                    author_id=comment["author_id"]
                ))
        
        # 簡單的批次插入（適用於單一程序批次匯入）
        if new_comments:
            self.session.add_all(new_comments)
            self.session.flush()
        
        return len(new_comments)
    
    def build_author_mapping(self, author_names: list) -> dict:
        """建立作者名稱到 ID 的映射"""
        if not author_names:
            return {}
        
        mapping_stmt = select(Author.name, Author.id).where(Author.name.in_(author_names))
        mapping_result = self.session.execute(mapping_stmt).all()
        return {row.name: row.id for row in mapping_result}
    
    def build_post_mapping(self, post_slugs: list) -> dict:
        """建立文章 slug 到 ID 的映射"""
        if not post_slugs:
            return {}
        
        mapping_stmt = select(Post.slug, Post.id).where(Post.slug.in_(post_slugs))
        mapping_result = self.session.execute(mapping_stmt).all()
        return {row.slug: row.id for row in mapping_result}


def init_database():
    """使用高效匯入器初始化資料到資料庫"""
    with Session(engine) as session:
        try:
            importer = DatabaseImporter(session)
            
            # 第一階段：匯入作者
            logger.info("正在匯入作者資料...")
            imported_authors, skipped_authors = importer.import_authors_efficiently(init_authors_data)
            session.commit()  # 單獨提交作者資料
            logger.info(f"已匯入 {imported_authors} 位新作者，跳過 {skipped_authors} 位重複作者")
            
            # 建立作者映射
            author_names = [author["name"] for author in init_authors_data]
            author_name_to_id = importer.build_author_mapping(author_names)
            
            # 第二階段：匯入文章
            logger.info("正在匯入文章資料...")
            imported_posts, skipped_posts = importer.import_posts_efficiently(init_posts_data, author_name_to_id)
            session.commit()  # 單獨提交文章資料
            logger.info(f"已匯入 {imported_posts} 篇新文章，跳過 {skipped_posts} 篇重複文章")
            
            # 建立文章映射
            post_slugs = [post["slug"] for post in init_posts_data]
            post_slug_to_id = importer.build_post_mapping(post_slugs)
            
            # 第三階段：匯入評論
            logger.info("正在匯入評論資料...")
            imported_comments = importer.import_comments_efficiently(init_posts_data, author_name_to_id, post_slug_to_id)
            session.commit()  # 單獨提交評論資料
            logger.info(f"已匯入 {imported_comments} 則評論")
            
            logger.info("✅ 所有初始資料已成功匯入資料庫")
            
        except Exception as e:
            logger.error(f"初始化資料時發生錯誤: {e}")
            session.rollback()
            raise