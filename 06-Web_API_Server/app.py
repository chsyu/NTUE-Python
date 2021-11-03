import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from router import product
from fastapi.responses import FileResponse


app = FastAPI(
    title="Shopping Cart API",
    description="This API was developed for teaching Fast API",
    version="0.0.1",
    terms_of_service="http://localhost:5000",
)

app.include_router(product.router)


@app.get("/{path1}")
def capture_routes():
    return FileResponse('build/index.html')


@app.get("/{path1}/{path2}")
def capture_routes():
    return FileResponse('build/index.html')


@app.get("/{path1}/{path2}/{path3}")
def capture_routes():
    return FileResponse('build/index.html')

    
app.mount("/", StaticFiles(directory="build", html=True), name="build")


if __name__ == "__main__":
    uvicorn.run("app:app", port= 5000, reload=True)


origins = [
    'http://localhost:3000',
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=['*']
)

