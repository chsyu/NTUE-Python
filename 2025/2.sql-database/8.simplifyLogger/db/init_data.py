"""資料庫初始化模組 - 支援 Author, Post, Comment 三表關聯（批次匯入版）"""
from sqlalchemy.orm import Session

from .engine import engine
from models import Author, Post, Comment
from config.logging_config import get_logger

# 獲取 logger
logger = get_logger(__name__)

def init_database():
    """初始化整個資料庫（批次匯入；同一交易內一次提交）"""
    with Session(engine) as session:
        # 只要任一表格有資料就跳過
        existing_authors = session.query(Author).count()
        existing_posts = session.query(Post).count()
        existing_comments = session.query(Comment).count()

        total_records = existing_authors + existing_posts + existing_comments
        if total_records > 0:
            logger.info(
                f"資料庫已有資料 (作者:{existing_authors}, 文章:{existing_posts}, 評論:{existing_comments})，跳過初始化"
            )
            return

        logger.info("資料庫為空，開始批次匯入測試資料...")

        # 延後載入，避免未用到時的匯入成本
        from data.init_authors import authors as init_authors_data
        from data.init_posts import posts as init_posts_data

        try:
            # ----------------------------
            # 1) 批次新增「作者」
            # ----------------------------
            logger.info("匯入作者資料（批次）...")
            author_objs = [Author(name=a["name"], email=a["email"]) for a in init_authors_data]
            session.add_all(author_objs)
            session.flush()  # 取得作者的自動產生 id（尚未 commit）

            # 建立「作者名 → 作者ID」映射（利用 flush 後的 in-memory objects）
            author_id_by_name = {a.name: a.id for a in author_objs}
            logger.info(f"成功建立作者映射，共 {len(author_id_by_name)} 筆")

            # ----------------------------
            # 2) 批次新增「文章」
            # ----------------------------
            logger.info("匯入文章資料（批次）...")
            post_objs = []
            for p in init_posts_data:
                post_objs.append(
                    Post(
                        slug=p["slug"],
                        title=p["title"],
                        content=p["content"],
                        likes=p["likes"],
                        author_id=author_id_by_name[p["author"]],
                    )
                )
            session.add_all(post_objs)
            session.flush()  # 取得文章 id

            # 建立「slug → 文章ID」映射
            post_id_by_slug = {p.slug: p.id for p in post_objs}
            logger.info(f"成功建立文章映射，共 {len(post_id_by_slug)} 筆")

            # ----------------------------
            # 3) 批次新增「評論」
            # ----------------------------
            logger.info("匯入評論資料（批次）...")
            comment_objs = []
            for p in init_posts_data:
                post_id = post_id_by_slug[p["slug"]]
                for c in p["comments"]:
                    comment_objs.append(
                        Comment(
                            content=c["content"],
                            post_id=post_id,
                            author_id=author_id_by_name[c["author"]],
                        )
                    )
            session.add_all(comment_objs)

            # ----------------------------
            # 4) 一次提交所有變更
            # ----------------------------
            session.commit()

            logger.info(f"成功匯入 {len(author_objs)} 位作者")
            logger.info(f"成功匯入 {len(post_objs)} 篇文章")
            logger.info(f"成功匯入 {len(comment_objs)} 則評論")
            logger.info("✅ 所有測試資料（批次）匯入完成！")

        except Exception as e:
            session.rollback()
            logger.error(f"測試資料匯入失敗（已回滾）: {e}")
            raise


def create_tables():
    """建立資料庫表格"""
    logger.info("建立資料庫表格...")
    from models.base import Base
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("資料庫表格建立完成")
    except Exception as e:
        logger.error(f"資料庫表格建立失敗: {e}")
        raise