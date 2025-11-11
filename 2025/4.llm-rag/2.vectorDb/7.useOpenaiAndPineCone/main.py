# main.py
from dotenv import load_dotenv
import os, time
from typing import Dict, Any, List
from texts import texts
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

# ==== 設定 ====
EMBED_MODEL = "text-embedding-3-small"  # 1536 維；若改 -large → 改 DIMENSION=3072
DIMENSION = 1536
INDEX_NAME = "demo-index"
NAMESPACE = "demo-v1"                   
TOP_K = 3

# ==== 初始化 ====
pc = Pinecone(api_key=PINECONE_API_KEY)
emb = OpenAIEmbeddings(model=EMBED_MODEL, openai_api_key=OPENAI_API_KEY)

def ensure_index(name: str, dim: int):
    existing = {i["name"] for i in pc.list_indexes().get("indexes", [])}
    if name not in existing:
        pc.create_index(
            name=name,
            dimension=dim,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )

def build_or_load_vectorstore(index_name: str, ns: str, docs: List[str]) -> PineconeVectorStore:
    ensure_index(index_name, DIMENSION)
    vectorstore = PineconeVectorStore(
        index_name=index_name,
        namespace=ns,
        embedding=emb,
        pinecone_api_key=PINECONE_API_KEY,
    )
    index = pc.Index(index_name)

    stats: Dict[str, Any] = index.describe_index_stats()
    count = stats.get("namespaces", {}).get(ns, {}).get("vector_count", 0)

    if count == 0 and docs:
        print(f"namespace={ns} 目前沒有資料，開始上傳 …")
        vectorstore.add_texts(
            texts=docs,
            metadatas=[{"source": f"doc-{i+1}"} for i in range(len(docs))],
        )
        print("已完成嵌入與上傳。")
    else:
        print(f"namespace={ns} 已有 {count} 筆，使用既有資料。")
    return vectorstore

def query_loop(retriever):
    print("\n輸入你的問題（輸入 'exit' 或 'quit' 可結束）：")
    while True:
        q = input("\n請輸入查詢：").strip()
        if q.lower() in ("exit", "quit"):
            print("結束程式。")
            break
        docs = retriever.invoke(q)
        if not docs:
            print("沒有找到相似結果。")
            continue
        print(f"\nTop-{TOP_K} 相似結果：")
        for i, doc in enumerate(docs, 1):
            print(f"{i}. {doc.page_content}")


vectorstore = build_or_load_vectorstore(INDEX_NAME, NAMESPACE, texts)
retriever = vectorstore.as_retriever(
    search_type="mmr",
    search_kwargs={"k": TOP_K, "fetch_k": 10, "lambda_mult": 0.3},
)
print("向量索引已就緒。")
query_loop(retriever)