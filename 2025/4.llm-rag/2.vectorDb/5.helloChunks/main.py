from doc import texts
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_community.vectorstores import Chroma  # ← 換成 Chroma

# === 設定 ===
MODEL_NAME = "nomic-embed-text"

# texts: List[str]（每個元素是一篇長文）
# 1) 先切 chunk
splitter = RecursiveCharacterTextSplitter(
    chunk_size=80,          # 每段約 80 個字元，足夠涵蓋完整句子
    chunk_overlap=20,        # 重疊 20 字元，讓語境連續
    add_start_index=True,
    separators=["\n\n", "\n", "。", "！", "？", "，", "；", " ", ""],
)
docs = splitter.create_documents(texts)
print(f"原始文本共 {len(texts)} 篇")
print(f"切分成 {len(docs)} 個 chunks")
print("前 3 個 chunks：")
for d in docs[:3]:
    print(d)    

# === 建立向量庫 ===
embeddings = OllamaEmbeddings(model=MODEL_NAME)
vs = Chroma.from_documents(documents=docs, embedding=embeddings)
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