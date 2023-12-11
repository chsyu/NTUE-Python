from fastapi import APIRouter
from db.productJson import product_list

router = APIRouter(
    prefix='/products',
    tags=['products']
)


@router.get('/')
def get_all_products():
    # return products
    return product_list


@router.get('/id/{product_id}')
def get_product_by_id(product_id):
    return next((product for product in product_list if product['id'] == product_id))


@router.get("/{category}")
def get_product_by_category(category):
    category_list = []
    for product in product_list:
        if product['category'].upper() == category.upper():
            category_list.append(product)
    return category_list
