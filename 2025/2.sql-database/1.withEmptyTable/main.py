# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from db.engine import engine
from models.base import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    yield
    
app = FastAPI(title="Blog API", version="1.0.0", lifespan=lifespan)

# CORS：視需求收斂 allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers.posts import router as posts_router
app.include_router(posts_router)

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)