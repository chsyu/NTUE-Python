import uvicorn
from fastapi import FastAPI
from productJson import productList


app = FastAPI()

@app.get("/")
def root():
    return "Hello World ......"


@app.get("/products")
def products():
    return productList


if __name__ == "__main__":
    uvicorn.run("app:app", port=5000, reload=True)
