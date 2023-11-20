from fastapi import APIRouter
from db.homeworkJson import homework_list

router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)


@router.get('/')
def get_all_homeworks() -> dict:
    """return all homeworks"""
    return homework_list


@router.get('/school')
def get_homeworks_by_school(school: str = "") -> dict:
    """
    return homeworks by school
    /school?school=ntue
    """
    try:
        return homework_list[school]
    except:
        return {}


@router.get('/semester')
def get_homeworks_by_semester(semester: str = "") -> list:
    """
    return homeworks by semester
    /semester?semester=111-1
    """
    try:
        ntue = homework_list["ntue"][semester]
        ntut = homework_list["ntut"][semester]

        return [*ntue, *ntut]
    except:
        return {}


@router.get('/school/semester')
def get_homeworks_by_semester(school: str = "", semester: str = "") -> list:
    """
    return homeworks by school and semester
    /school/semester?school=ntue&semester=111-1
    """
    try:
        return homework_list[school][semester]
    except:
        return {}
