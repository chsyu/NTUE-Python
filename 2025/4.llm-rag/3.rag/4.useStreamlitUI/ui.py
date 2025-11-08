import streamlit as st
import requests

# =====================
# 基本設定
# =====================
st.set_page_config(page_title="RAG 管理介面", layout="wide")
st.title("📚 RAG (Pinecone + OpenAI) 管理介面")

# API 基礎位址（可在側邊欄調整）
API_BASE = "http://127.0.0.1:5000"

def call_api(method: str, path: str, **kwargs):
    """統一呼叫 API 的輔助函式"""
    url = f"{API_BASE}{path}"
    try:
        resp = requests.request(method, url, timeout=60, **kwargs)
        st.caption(f"HTTP {resp.status_code} ← {url}")
        
        # 嘗試解析 JSON 回應
        try:
            return resp.json()
        except Exception:
            st.warning("⚠️ 回應非 JSON 格式")
            st.code(resp.text)
            return None
    except requests.exceptions.RequestException as e:
        st.error(f"❌ 請求失敗：{e}")
        return None


# =====================
# 問答功能
# =====================
st.header("💬 問答")
query = st.text_input("輸入問題：")
if st.button("送出查詢"):
    if not query.strip():
        st.warning("請先輸入問題")
    else:
        data = call_api("POST", "/chat", json={"user": query})
        if data:
            st.success(data.get("answer", ""))
            st.write("### 🔎 來源片段")
            for i, src in enumerate(data.get("sources", []), 1):
                st.write(f"[{i}] {src}")

# =====================
# 新增文件
# =====================
st.header("➕ 新增文件")

# 單一文件
new_doc = st.text_area("輸入單一文件：")
if st.button("新增單筆文件"):
    if not new_doc.strip():
        st.warning("請先輸入文件內容")
    else:
        data = call_api("POST", "/add_document", params={"text": new_doc})
        if data:
            st.success(f"✓ 已新增文件，ID: {data.get('doc_id', 'N/A')}")

# 批次文件
st.subheader("批次新增")
multi_docs = st.text_area("輸入多筆文件（每行一筆）：")
if st.button("新增多筆文件"):
    docs = [line.strip() for line in multi_docs.splitlines() if line.strip()]
    if not docs:
        st.warning("請先輸入至少一筆內容")
    else:
        data = call_api("POST", "/add_documents", json=docs)
        if data:
            st.success(f"✓ 已新增 {data.get('count', 0)} 筆文件")

# =====================
# 刪除文件
# =====================
st.header("🗑 刪除文件")

# 刪除全部
if st.button("刪除全部文件", type="primary"):
    data = call_api("DELETE", "/delete_all_documents")
    if data:
        st.success("✓ " + data.get("message", "已刪除所有文件"))

# 刪除指定 ID
st.subheader("刪除指定文件")
delete_ids = st.text_input("輸入要刪除的文件 ID（逗號分隔）", placeholder="doc-xxx1,doc-xxx2")
if st.button("刪除指定文件"):
    ids = [x.strip() for x in delete_ids.split(",") if x.strip()]
    if not ids:
        st.warning("請先輸入至少一個 ID")
    else:
        data = call_api("DELETE", "/delete_by_ids", json={"ids": ids})
        if data:
            st.success(f"✓ 已刪除 {data.get('deleted_count', 0)} 筆文件")

# =====================
# 索引管理
# =====================
st.header("📊 索引管理")

# 統計資訊
if st.button("查看索引統計"):
    data = call_api("GET", "/list_stats")
    if data:
        st.json(data)

# 文件清單
st.subheader("文件清單")
limit = st.number_input("顯示筆數", min_value=1, max_value=100, value=10)
if st.button("列出文件"):
    data = call_api("GET", f"/list_documents?limit={limit}")
    if data:
        st.write(f"**總計：{data.get('count', 0)} 筆**")
        st.json(data.get("documents", []))

# =====================
# 主程式入口
# =====================
if __name__ == "__main__":
    import sys
    print("⚠️  請使用以下指令執行 Streamlit 應用：")
    print("   streamlit run ui.py")
    print("\n或者使用：")
    print("   python -m streamlit run ui.py")
    sys.exit(1)