// post.js （ES Module + Top-Level Await + 美化網址 replaceState）
const contentEl = document.getElementById('content');

// 支援兩種帶入法：
// A) /post.html?slug=xxx 或 ?id=123
// B) /posts/xxx（需要伺服器 rewrite 到 post.html）
const path = location.pathname;
const params = new URLSearchParams(location.search);
const prettySlug = path.startsWith('/posts/') ? path.split('/').pop() : null;

const slug = prettySlug || params.get('slug');
const id   = params.get('id');

if (!slug && !id) {
  document.title = '參數缺失';
  contentEl.textContent = '缺少 slug 或 id。';
} else {
  try {
    contentEl.textContent = '載入中…';

    // 單篇端點：若用 slug，假設是 GET /api/posts/:slug；若用 id，則 /api/posts/:id
    const key = slug ?? id;
    const res = await axios.get(`http://127.0.0.1:5000/api/posts/${encodeURIComponent(key)}`, { timeout: 10000 });
    const post = res.data;

    document.title = post.title || '文章';

    // 如果目前網址是 /post.html?slug=...，而後端回傳含有 slug，就把網址美化成 /posts/<slug>（不重整、也不新增歷史紀錄）
    if (post.slug && path.endsWith('/post.html')) {
      history.replaceState({ slug: post.slug }, '', `/posts/${post.slug}`);
    }

    // 渲染內容（假設後端回來的 post.content / post.html 為可信任 HTML；否則請先做 XSS 清洗）
    contentEl.innerHTML = `
      <article>
        <h1>${post.title}</h1>
        <p>作者：${post.author ?? ''}</p>
        <div class="post-body">${post.content || post.html || ''}</div>
      </article>
    `;
  } catch (err) {
    document.title = '找不到文章';
    contentEl.textContent = `載入失敗或找不到文章：${err.message}`;
    console.error('單篇載入錯誤', err);
  }
}
