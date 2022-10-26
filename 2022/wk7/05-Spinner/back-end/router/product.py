from fastapi import APIRouter
from db.productJson import product_list
import time

router = APIRouter(
    prefix='/products',
    tags=['products']
)


@router.get('/')
def get_all_products():
    time.sleep(10)
    return product_list


@router.get('/id/{product_id}')
def get_product_by_id(product_id):
    time.sleep(10)
    return next((product for product in product_list if product['id'] == product_id))


@router.get("/{category}")
def get_product_by_category(category):
    time.sleep(10)
    category_list = []
    for product in product_list:
        if product['category'].upper() == category.upper():
            category_list.append(product)
    return category_list
