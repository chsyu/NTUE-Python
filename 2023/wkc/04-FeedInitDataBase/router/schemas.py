from pydantic import BaseModel


class HomeworkRequestSchema(BaseModel):
    school: str
    semester: int
    workName: str
    githubUrl: str
    websiteUrl: str
    pptUrl: str
    imgUrl: str
    skill   : str
    name   : str


class HomeworkResponseSchema(HomeworkRequestSchema):
    id: int

    class Config():
        from_attributes = True
