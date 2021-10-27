import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
   return {"title": "Hello World"}

if __name__ == "__main__":
   uvicorn.run("app:app", port= 5000, reload=True)


   