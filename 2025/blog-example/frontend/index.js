// index.js （ES Module + Top-Level Await）
const listEl = document.getElementById('list');

try {
  listEl.textContent = '載入中…';
  // 取得文章列表（假設 /api/posts 回傳 [{id, slug, title, author, ...}]）
  const res = await axios.get('http://127.0.0.1:5000/api/posts', { timeout: 10000 });
  const posts = res.data;

  listEl.innerHTML = posts.map(p => `
    <a class="card" href="/post.html?slug=${encodeURIComponent(p.slug || '')}&id=${encodeURIComponent(p.id ?? '')}">
      <h3>${p.title}</h3>
      <p>作者：${p.author ?? ''}</p>
    </a>
  `).join('');
} catch (err) {
  listEl.innerHTML = `<p>讀取失敗：${err.message}</p>`;
  console.error('列表載入錯誤', err);
}
