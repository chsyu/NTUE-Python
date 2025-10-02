# main.py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.posts import router as posts_router

app = FastAPI()

# CORS：視需求收斂 allow_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router)

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)