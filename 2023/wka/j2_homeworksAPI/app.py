import uvicorn
from fastapi import FastAPI
from homework import homework

app = FastAPI()


@app.get("/homework")
def root():
    return homework

if __name__ == "__main__":
    uvicorn.run("app:app", port=5000, reload=True)
