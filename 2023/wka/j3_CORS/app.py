import uvicorn
from fastapi import FastAPI
from homework import homework
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


@app.get("/homework")
def root():
    return homework

if __name__ == "__main__":
    uvicorn.run("app:app", port=5000, reload=True)

origins = [
    'http://localhost:5173',
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=['*']
)