import uvicorn
from fastapi import FastAPI
from productJson import product_list

app = FastAPI()


@app.get("/")
def root():
    return {"title": "Hello World"}


@app.get("/products")
def get_all_products():
    return product_list


@app.get('/id/{product_id}')
def get_product_by_id(product_id):
    return next((product for product in product_list if product['id'] == product_id), None)


@app.get("/products/{category}")
def get_product_by_category(category):
    category_list = []
    for product in product_list:
        if product['category'].upper() == category.upper():
            category_list.append(product)
    return category_list


if __name__ == "__main__":
    uvicorn.run("app:app", port=5000, reload=True)
