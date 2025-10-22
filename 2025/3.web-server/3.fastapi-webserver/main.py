from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 提供靜態文件
app.mount("/", StaticFiles(directory=Path(__file__).parent / "dist", html=True), name="static")

# 其他所有路徑回傳 404 錯誤頁面
@app.middleware("http")
async def custom_404(request: Request, call_next):
    response = await call_next(request)
    if response.status_code == 404:
        return FileResponse(Path(__file__).parent / "dist" / "404.html", status_code=404)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=3000)