from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# SQLALCHEMY_DATABASE_URL = "sqlite:///./shopping-cart.db"
# postgresql://${{ PGUSER }}:${{ PGPASSWORD }}@${{ PGHOST }}:${{ PGPORT }}/${{ PGDATABASE }}
load_dotenv()

PGUSER = os.environ.get("PGUSER")
PGPASSWORD = os.environ.get("PGPASSWORD")
PGHOST = os.environ.get("PGHOST")
PGPORT = os.environ.get("PGPORT")
PGDATABASE = os.environ.get("PGDATABASE")

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:WJ9tssEgGYUSviytwMYJ@containers-us-west-58.railway.app:6472/railway"
SQLALCHEMY_DATABASE_URL = f"postgresql://{PGUSER}:{PGPASSWORD}@{PGHOST}:{PGPORT}/{PGDATABASE}"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# ) 

engine = create_engine(SQLALCHEMY_DATABASE_URL) 

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()