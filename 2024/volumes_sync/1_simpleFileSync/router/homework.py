from fastapi import APIRouter
from db.homeworkJson import homework_list

router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)


@router.get('/')
def get_all_homeworks():
    # return homeworks
    return homework_list
