from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# === 基本設定 ===
BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
PORT = 3001  

app = FastAPI()

app.mount("/", StaticFiles(directory=DIST_DIR, html=True), name="static")

@app.middleware("http")
async def custom_404_middleware(request: Request, call_next):
    response = await call_next(request)
    if response.status_code == 404:
        not_found = DIST_DIR / "404.html"
        if not_found.exists():
            return FileResponse(not_found, status_code=404, media_type="text/html")
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)