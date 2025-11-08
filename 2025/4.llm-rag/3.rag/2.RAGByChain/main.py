# main.py
"""
LangChain RAG 教學範例
使用 Chroma 向量資料庫 + Ollama LLM 實現檢索增強生成
"""
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from texts import texts

from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# =====================
# 配置設定
# =====================
BASE_DIR = Path(__file__).resolve().parent
PERSIST_DIR = BASE_DIR / "chroma_store"
EMBED_MODEL = "nomic-embed-text"
LLM_MODEL = "qwen2.5:7b-instruct"
DEFAULT_SYSTEM_PROMPT = (
    "你是精煉且忠實的助教，禁止臆測。嚴禁生成不符合事實的內容。"
    "若無法從提供的內容得到答案，請直說不知道。"
)

# =====================
# 向量庫初始化
# =====================
def init_vectorstore(embeddings: OllamaEmbeddings, seed_texts: List[str]) -> Chroma:
    """初始化或載入向量資料庫"""
    if PERSIST_DIR.exists():
        print("✓ 載入既有向量庫")
        return Chroma(
            persist_directory=str(PERSIST_DIR),
            embedding_function=embeddings,
        )
    print("✓ 建立新向量庫")
    return Chroma.from_texts(
        texts=seed_texts,
        embedding=embeddings,
        persist_directory=str(PERSIST_DIR),
    )

# 初始化組件
embeddings = OllamaEmbeddings(model=EMBED_MODEL)
vectorstore = init_vectorstore(embeddings, texts)

# 配置檢索器（使用 MMR 多樣性檢索）
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 20, "lambda_mult": 0.2},
)

# =====================
# RAG Chain 構建
# =====================
def format_docs(docs) -> str:
    """格式化檢索到的文件"""
    return "\n".join(f"[{i+1}] {doc.page_content}" for i, doc in enumerate(docs))

# 檢索步驟：將問題轉換為相關文件
retriever_chain = RunnablePassthrough.assign(
    context=lambda x: format_docs(retriever.get_relevant_documents(x["question"]))
)

# 提示詞模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "{system}"),
    ("user", "根據以下內容回答問題。若內容不足以回答，請說不知道。\n\n"
             "【內容】\n{context}\n\n"
             "【問題】\n{question}")
])

# LLM
llm = ChatOllama(model=LLM_MODEL, temperature=0.2)

# 完整的 RAG Chain：檢索 → 提示詞 → LLM
rag_chain = retriever_chain | prompt | llm

# =====================
# FastAPI 應用
# =====================
app = FastAPI(title="RAG (Chroma + Ollama)")

class ChatRequest(BaseModel):
    """聊天請求模型"""
    model: str = LLM_MODEL
    system: Optional[str] = DEFAULT_SYSTEM_PROMPT
    user: str

@app.post("/chat")
def chat(req: ChatRequest):
    """處理聊天請求"""
    # 合併系統提示詞
    system_prompt = (
        DEFAULT_SYSTEM_PROMPT
        if req.system == DEFAULT_SYSTEM_PROMPT
        else f"{DEFAULT_SYSTEM_PROMPT}\n\n[用戶補充]\n{req.system or ''}"
    )
    
    # 執行 RAG Chain
    result = rag_chain.invoke({
        "system": system_prompt,
        "question": req.user
    })
    
    # 獲取檢索來源（用於顯示）
    sources = retriever.get_relevant_documents(req.user)
    
    return {
        "answer": result.content,
        "sources": [doc.page_content for doc in sources],
        "k": 4,
        "mmr": {"fetch_k": 20, "lambda_mult": 0.2},
        "model": req.model,
        "embed_model": EMBED_MODEL,
    }

@app.get("/health")
def health():
    """健康檢查"""
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)