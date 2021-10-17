import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return "Hello World ......"


@app.get("/products")
def products():
    return {"products": {
        "name": "book",
                "price": 100,
                "qty": 2
    }}


if __name__ == "__main__":
    uvicorn.run("app:app", port=5000, reload=True)
