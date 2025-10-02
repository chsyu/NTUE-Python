import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from posts import posts

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/posts")
def root():
    return posts

@app.get("/api/posts/{slug}")
def get_post(slug: str):
    for post in posts:
        if post["slug"] == slug:
            return post
    return {"error": "Post not found"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)
