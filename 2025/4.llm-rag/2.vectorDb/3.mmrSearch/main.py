from dotenv import load_dotenv
from texts import texts
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import Chroma

# 讀取 .env
load_dotenv()

# === 設定 ===
MODEL_NAME = "nomic-embed-text"

# === 建立向量庫 ===
embeddings = OllamaEmbeddings(model=MODEL_NAME)
vs = Chroma.from_texts(texts=texts, embedding=embeddings)
retriever = vs.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 3, "fetch_k": 10, "lambda_mult": 0.3},
)
print("向量庫已建立。")

# === 重複詢問使用者輸入 ===
print("\n輸入你的問題（輸入 'exit' 或 'quit' 可結束）：")

while True:
    query = input("\n請輸入查詢：").strip()
    if query.lower() in ("exit", "quit"):
        print("結束程式。")
        break

    docs = retriever.invoke(query)
    print("\nTop-3 相似結果：")
    for i, d in enumerate(docs, 1):
        print(f"{i}. {d.page_content}")