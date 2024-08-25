from fastapi import APIRouter
from db.productJson import product_list
import glob
import re

router = APIRouter(
    prefix='/products',
    tags=['products']
)

data_files = glob.glob("data/*.py")
file_content = {}
for file_path in data_files:
    file_name = file_path.split('/')[-1]
    match = re.search(r'product(\d+)', file_name)
    if match:
        date = match.group(1)
        print("檔案日期:", date)

        with open(file_path, 'r') as file:
            file_read = file.read()
            exec(file_read, {}, file_content)

        product_list = file_content.get('product_list')
        print("商品數量:", len(product_list))
        break


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
