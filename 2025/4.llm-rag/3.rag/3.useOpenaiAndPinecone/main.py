from dotenv import load_dotenv
import os
import uuid
from typing import List, Optional
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from texts import texts

# LangChain + OpenAI + Pinecone
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.documents import Document

# =====================
# 基本設定
# =====================
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

EMBED_MODEL = "text-embedding-3-small"
LLM_MODEL = "gpt-4o-mini"
INDEX_NAME = "rag-demo-index"
DIMENSION = 1536  # text-embedding-3-small 對應 1536 維
DEFAULT_SYSTEM_PROMPT = (
    "你是一個精煉且忠實的助教。\n"
    "你的回答必須完全依據提供的內容，不得自行推測或引入外部知識。\n"
    "如果內容不足以回答，請直接回答：『我不知道』。"
)

# =====================
# 初始化 Pinecone
# =====================
def init_pinecone_index() -> Pinecone.Index:
    """初始化或載入 Pinecone 索引"""
    pc = Pinecone(api_key=PINECONE_API_KEY)
    
    # 檢查索引是否存在，不存在則建立
    existing_indexes = {idx["name"] for idx in pc.list_indexes().get("indexes", [])}
    if INDEX_NAME not in existing_indexes:
        print(f"✓ 建立新索引：{INDEX_NAME}")
        pc.create_index(
            name=INDEX_NAME,
            dimension=DIMENSION,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
    else:
        print(f"✓ 載入既有索引：{INDEX_NAME}")
    
    return pc.Index(INDEX_NAME)

# 初始化組件
index = init_pinecone_index()
embeddings = OpenAIEmbeddings(model=EMBED_MODEL)

# 如果索引為空，上傳初始語料
stats = index.describe_index_stats()
if stats.get("total_vector_count", 0) == 0:
    print("✓ 索引為空，上傳教材語料…")
    vectors = embeddings.embed_documents(texts)
    payload = [
        (f"doc-{uuid.uuid4().hex[:8]}", vector, {"text": text})
        for text, vector in zip(texts, vectors)
    ]
    index.upsert(vectors=payload)
    print("✓ 已完成上傳")

# 建立 VectorStore
vectorstore = PineconeVectorStore(index=index, embedding=embeddings, text_key="text")

# 配置 Retriever（使用 MMR 多樣性檢索）
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 20, "lambda_mult": 0.2},
)

def format_docs(docs: List[Document]) -> str:
    """將檢索到的文件格式化為文字"""
    return "\n".join(f"[{i+1}] {doc.page_content}" for i, doc in enumerate(docs))

# =====================
# RAG Chain 構建
# =====================
# 檢索步驟：將問題轉換為相關文件
retriever_chain = RunnablePassthrough.assign(
    context=lambda x: format_docs(retriever.invoke(x["question"]))
)

# 提示詞模板
prompt = ChatPromptTemplate.from_messages([
    ("system", "{system}"),
    ("user",
     "根據以下提供的內容回答問題。若內容不足以回答，請說你不知道。\n\n"
     "【內容】\n{context}\n\n"
     "【問題】\n{question}")
])

# LLM
llm = ChatOpenAI(model=LLM_MODEL, temperature=0.2)

# 完整的 RAG Chain：檢索 → 提示詞 → LLM
rag_chain = retriever_chain | prompt | llm

# =====================
# FastAPI 應用
# =====================
app = FastAPI(title="RAG (Pinecone + OpenAI)")

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
    sources = retriever.invoke(req.user)
    
    return {
        "answer": result.content,
        "sources": [doc.page_content for doc in sources],
        "k": 4,
        "mmr": {"fetch_k": 20, "lambda_mult": 0.2},
        "model": req.model,
        "embed_model": EMBED_MODEL,
    }

@app.post("/add_document")
def add_document(text: str):
    """新增單一文件到向量資料庫"""
    vector = embeddings.embed_query(text)
    doc_id = f"doc-{uuid.uuid4().hex[:8]}"
    index.upsert(vectors=[(doc_id, vector, {"text": text})])
    return {"status": "ok", "doc_id": doc_id}

@app.post("/add_documents")
def add_documents(doc_texts: List[str]):
    """批次新增文件到向量資料庫"""
    vectors = embeddings.embed_documents(doc_texts)
    payload = [
        (f"doc-{uuid.uuid4().hex[:8]}", vector, {"text": text})
        for text, vector in zip(doc_texts, vectors)
    ]
    index.upsert(vectors=payload)
    return {"status": "ok", "count": len(doc_texts)}

@app.delete("/delete_all_documents")
def delete_all_documents():
    """刪除整個 Pinecone 索引的所有向量"""
    index.delete(delete_all=True)
    return {"status": "ok", "message": "所有向量已刪除"}

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)