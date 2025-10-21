"""
Vercel ASGI handler for FastAPI
This file is required for Vercel deployment
"""
import os
import logging

# Set up basic logging for Vercel
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    force=True,
)

logger = logging.getLogger(__name__)

try:
    # Import the FastAPI app
    from main import app
    logger.info("FastAPI app imported successfully")
    
    # Add a debug endpoint to the main app
    @app.get("/debug")
    async def debug_info():
        import sys
        return {
            "python_version": sys.version,
            "environment": "vercel",
            "imports_working": True
        }
        
except Exception as e:
    logger.error(f"Failed to import FastAPI app: {e}")
    import traceback
    logger.error(f"Traceback: {traceback.format_exc()}")
    
    # Create a minimal FastAPI app as fallback
    from fastapi import FastAPI
    app = FastAPI(title="Fallback API")
    
    @app.get("/")
    async def fallback():
        return {"error": "App initialization failed", "details": str(e)}
    
    @app.get("/debug")
    async def debug_fallback():
        import sys
        return {
            "python_version": sys.version,
            "environment": "vercel",
            "imports_working": False,
            "error": str(e)
        }

# Vercel expects the ASGI app to be available as 'app'
# This file serves as the entry point for Vercel
