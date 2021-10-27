import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from productJson import product_list

app = FastAPI()


@app.get("/")
async def root():
   return {"title": "Hello World"}


@app.get("/products")
async def get_all_products():
    return product_list


@app.get("/products/id/{id}")
async def get_product_by_id(id):
    return next(
       (product for product in product_list if product['id'] == id)
       , None)


@app.get("/products/{category}")
async def get_product_by_category(category):
   category_list = []
   for product in product_list:
	   if product['category'].upper() == category.upper():
		   category_list.append(product)
   return category_list

if __name__ == "__main__":
   uvicorn.run("app:app", port= 5000, reload=True)


origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=['*']
)

