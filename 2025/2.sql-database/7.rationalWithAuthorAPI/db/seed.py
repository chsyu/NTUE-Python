"""
    python -m db.seed
"""
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.dialects.sqlite import insert

from db.engine import engine
from models.base import Base
from models.authors import Author
from models.posts import PostDB
from models.comments import Comment
from data.init_authors import authors as seed_authors
from data.init_posts import posts as seed_posts

def seed():
    with Session(engine) as s, s.begin():
        # 1) 批量寫入 authors（重複略過）
        authors_added = 0
        if seed_authors:
            stmt_authors = (
                insert(Author)
                .values([{"name": n} for n in seed_authors])
                .on_conflict_do_nothing(index_elements=[Author.name])
            )
            result = s.execute(stmt_authors)
            authors_added = result.rowcount or 0  # 新增筆數（略過的筆數不算）

        # 2) 批量查本批會用到的作者 → 建 name->id 對照（不檢查缺作者，找不到就略過）
        # 先找出所有用到的作者名稱
        names_used = {
            p["author"] for p in seed_posts
        } | {c["author"] for p in seed_posts for c in p.get("comments", [])}
        # 再查出對應的 id
        author_map = dict(
            s.execute(
                select(Author.name, Author.id).where(Author.name.in_(names_used))
            ).all()
        )

        # 3) 批量寫入 posts（slug 衝突略過），用 RETURNING 一次拿回新建的 (slug, id)
        post_rows = []
        for p in seed_posts:
            aid = author_map.get(p["author"])
            if not aid:
                continue  # 不檢查缺作者：找不到就略過這篇 post
            post_rows.append({
                "slug": p["slug"],
                "title": p["title"],
                "content": p["content"],
                "likes": p.get("likes", 0),
                "author_id": aid,
            })

        posts_added = 0
        comments_added = 0

        if post_rows:
            stmt = (
                insert(PostDB)
                .values(post_rows)
                .on_conflict_do_nothing(index_elements=[PostDB.slug])
                .returning(PostDB.slug, PostDB.id)  # 只有「真的新插入」會回傳
            )
            inserted = dict(s.execute(stmt).all())  # {slug: id}
            posts_added = len(inserted)

            # 4) 針對「本次新插入的 posts」批量建立 comments（作者找不到就略過）
            comment_rows = []
            for p in seed_posts:
                pid = inserted.get(p["slug"])
                if not pid:
                    continue
                for c in p.get("comments", []):
                    caid = author_map.get(c["author"])
                    if not caid:
                        continue
                    comment_rows.append({
                        "post_id": pid,
                        "author_id": caid,
                        "content": c["content"],
                    })
            if comment_rows:
                s.execute(insert(Comment), comment_rows)
                comments_added = len(comment_rows)

    print(f"Seed done: authors+={authors_added}, posts+={posts_added}, comments+={comments_added}（authors 先批量對照，缺作者靜默略過）")

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    seed()