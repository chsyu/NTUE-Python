from fastapi import APIRouter
from db.one_table_homework import homework_list

router = APIRouter(
    prefix='/homeworks',
    tags=['homeworks']
)


@router.get('/')
def get_all_homeworks() -> list:
    """return all homeworks"""
    return homework_list


@router.get('/school')
def get_homeworks_by_school(school: str = "") -> list:
    """
    return homeworks by school
    /school?school=ntue
    """
    try:
        homeworks = [homework for homework in homework_list if homework["school"] == school]
        return homeworks
    except:
        return []


@router.get('/semester')
def get_homeworks_by_semester(semester: str = "") -> list:
    """
    return homeworks by semester
    /semester?semester=111-1
    """
    try:
        homeworks = [homework for homework in homework_list if homework["semester"] == semester]
        return homeworks
    except:
        return []


@router.get('/school/semester')
def get_homeworks_by_semester(school: str = "", semester: str = "") -> list:
    """
    return homeworks by school and semester
    /school/semester?school=ntue&semester=111-1
    """
    try:
        homeworks = [homework for homework in homework_list if
                     (homework["school"] == school and homework["semester"] == semester)]
        return homeworks
    except:
        return []
