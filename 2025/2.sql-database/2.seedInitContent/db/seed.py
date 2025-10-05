from sqlalchemy.orm import Session
from sqlalchemy.dialects.sqlite import insert
from db.engine import engine
from models.base import Base
from models.posts import PostDB
from data.init_posts import posts as seed_posts

def init_posts():
    rows = [{k: v for k, v in p.items() if k != "id"} for p in seed_posts]

    with Session(engine) as s, s.begin():
        stmt = insert(PostDB).values(rows).on_conflict_do_nothing(
            index_elements=[PostDB.slug]
        )
        s.execute(stmt)

    print("Seed done via UPSERT with auto-increment IDs.")

if __name__ == "__main__":
    Base.metadata.create_all(engine)
    init_posts()