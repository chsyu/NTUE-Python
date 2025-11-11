# main.py
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from texts import texts

from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document

# =====================
# 向量庫設定
# =====================
BASE_DIR = Path(__file__).resolve().parent
PERSIST_DIR = BASE_DIR / "chroma_store"
EMBED_MODEL = "nomic-embed-text"
LLM_MODEL = "qwen2.5:7b-instruct"
DEFAULT_SYSTEM_PROMPT = (
    "你是精煉且忠實的助教，禁止臆測。嚴禁生成不符合事實的內容。"
    "若無法從提供的內容得到答案，請直說不知道。"
)

def build_or_load_vectorstore(embeddings: OllamaEmbeddings, seed_texts: List[str]) -> Chroma:
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

# =====================
# 啟動時初始化：Embeddings / VectorStore / Retriever
# =====================
embeddings = OllamaEmbeddings(model=EMBED_MODEL)
vectorstore = build_or_load_vectorstore(embeddings, texts)

# 使用 MMR 的 Retriever（多樣性檢索）
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 20, "lambda_mult": 0.2},
)

def format_docs(docs: List[Document]) -> str:
    """將檢索到的文件格式化為文字"""
    return "\n".join(f"[{i}] {doc.page_content}" for i, doc in enumerate(docs, 1))

# =====================
# FastAPI 介面
# =====================
class ChatRequest(BaseModel):
    """聊天請求模型"""
    model: str = LLM_MODEL
    system: Optional[str] = DEFAULT_SYSTEM_PROMPT
    user: str

app = FastAPI(title="RAG over Chroma + Ollama")

@app.post("/chat")
def chat(req: ChatRequest):
    """處理聊天請求（檢索在 chain 外執行）"""
    # 合併系統提示詞
    system_prompt = (
        DEFAULT_SYSTEM_PROMPT
        if req.system == DEFAULT_SYSTEM_PROMPT
        else f"{DEFAULT_SYSTEM_PROMPT}\n\n[用戶補充]\n{req.system or ''}"
    )

    # 步驟 1：檢索相關文件（RAG 的 Retrieval）
    retrieved = retriever.invoke(req.user)
    context = format_docs(retrieved)

    # 步驟 2：建立提示詞模板
    prompt = ChatPromptTemplate.from_messages([
        ("system", "{system}"),
        ("user",
         "根據以下提供的內容回答問題。若內容不足以回答，請說你不知道。\n\n"
         "【內容】\n{context}\n\n"
         "【問題】\n{question}")
    ])

    # 步驟 3：建立 LLM（每次請求可用不同模型）
    llm = ChatOllama(model=req.model, temperature=0.2)

    # 步驟 4：建立 Chain（prompt -> llm）
    chain = prompt | llm

    # 步驟 5：執行 Chain 生成回答
    result = chain.invoke({
        "system": system_prompt,
        "context": context,
        "question": req.user
    })

    # 回傳結果（包含來源片段供教學參考）
    return {
        "answer": result.content,
        "sources": [doc.page_content for doc in retrieved],
        "k": 4,
        "mmr": {"fetch_k": 20, "lambda_mult": 0.2},
        "model": req.model,
        "embed_model": EMBED_MODEL,
    }

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)