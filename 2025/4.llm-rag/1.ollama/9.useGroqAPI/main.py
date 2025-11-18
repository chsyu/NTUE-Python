from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import uvicorn
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv

# 讀取 .env 檔案
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

LLM_MODEL = "llama-3.1-8b-instant"  # Groq 模型
DEFAULT_SYSTEM_PROMPT = "你是精煉且忠實的助教，禁止臆測。嚴禁生成不符合事實的內容。"

class ChatRequest(BaseModel):
    model: str = LLM_MODEL
    system: Optional[str] = DEFAULT_SYSTEM_PROMPT
    user: str

app = FastAPI(title="LC + Groq: chat")

@app.post("/chat")
def chat(req: ChatRequest):
    sys_merged = DEFAULT_SYSTEM_PROMPT if req.system == DEFAULT_SYSTEM_PROMPT \
                 else f"{DEFAULT_SYSTEM_PROMPT}\n\n[用戶補充]\n{req.system or ''}"

    # LangChain 提示模板（等價於 system + user）
    prompt = ChatPromptTemplate.from_messages([
        ("system", sys_merged),
        ("user", "{question}")
    ])

    # 改用 GroqAPI
    llm = ChatGroq(model=LLM_MODEL, temperature=0.3, groq_api_key=GROQ_API_KEY)

    chain = prompt | llm | StrOutputParser()

    result = chain.invoke({"question": req.user})
    return {"answer": result}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)