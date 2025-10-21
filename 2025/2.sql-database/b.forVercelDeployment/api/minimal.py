"""
Minimal FastAPI app for Vercel testing
This version removes all potential problematic imports
"""
from fastapi import FastAPI
import os

# Create a minimal FastAPI app
app = FastAPI(title="Minimal Test API")

@app.get("/")
async def root():
    return {
        "message": "Minimal API is working",
        "environment": "vercel" if os.getenv("VERCEL") == "1" else "local"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/test")
async def test():
    return {"test": "success"}

# Test database connection separately
@app.get("/db-test")
async def db_test():
    try:
        from db.engine import engine
        # Just test if we can import the engine
        return {"database_import": "success", "engine": str(engine)}
    except Exception as e:
        return {"database_import": "failed", "error": str(e)}

# Test database connection with actual connection attempt
@app.get("/db-connect-test")
async def db_connect_test():
    try:
        from db.engine import engine
        # Try to actually connect
        with engine.connect() as conn:
            result = conn.execute("SELECT 1 as test")
            return {"database_connection": "success", "test_query": result.fetchone()[0]}
    except Exception as e:
        return {"database_connection": "failed", "error": str(e)}

# Test model imports separately  
@app.get("/models-test")
async def models_test():
    try:
        from models import Author, Post, Comment
        return {"models_import": "success"}
    except Exception as e:
        return {"models_import": "failed", "error": str(e)}

# Test main app import
@app.get("/main-app-test")
async def main_app_test():
    try:
        from main import app as main_app
        return {"main_app_import": "success"}
    except Exception as e:
        return {"main_app_import": "failed", "error": str(e)}
