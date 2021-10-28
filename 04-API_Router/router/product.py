from fastapi import APIRouter
from db.productJson import product_list

router = APIRouter(
    prefix='/products',
    tags=['products']
)


@router.get('/')
async def get_all_products():
  # return products
    return product_list


@router.get('/id/{id}')
async def get_product_by_id(id):
    return next(
        (product for product in product_list if product['id'] == id), None)


@router.get("/{category}")
async def get_product_by_category(category):
   category_list = []
   for product in product_list:
	   if product['category'].upper() == category.upper():
		   category_list.append(product)
   return category_list
