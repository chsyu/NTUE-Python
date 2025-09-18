// post.js （ES Module + Top-Level Await + 美化網址 replaceState）
const contentEl = document.getElementById('content');

const path = location.pathname;
const params = new URLSearchParams(location.search);
const prettySlug = path.startsWith('/posts/') ? path.split('/').pop() : null;

const slug = prettySlug || params.get('slug');
const id   = params.get('id');

function renderArticle(post) {
  const author = post.author ?? '';
  const body = post.content || post.html || '';
  contentEl.innerHTML = `
    <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 class="text-2xl md:text-3xl font-bold">${post.title}</h1>
      <p class="mt-1 text-sm text-slate-600">作者：${author}</p>
      <div class="prose prose-slate max-w-none mt-4">${body}</div>
    </article>
  `;
}

if (!slug && !id) {
  document.title = '參數缺失';
  contentEl.innerHTML = '<div class="text-rose-600">缺少 slug 或 id。</div>';
} else {
  try {
    contentEl.innerHTML = '<div class="text-slate-500">載入中…</div>';
    const key = slug ?? id;
    const res = await axios.get(`http://127.0.0.1:5000/api/posts/${encodeURIComponent(key)}`, { timeout: 10000 });
    const post = res.data;

    document.title = post.title || '文章';

    if (post.slug && path.endsWith('/post.html')) {
      history.replaceState({ slug: post.slug }, '', `/posts/${post.slug}`);
    }

    renderArticle(post);
  } catch (err) {
    document.title = '找不到文章';
    contentEl.innerHTML = `<div class="text-rose-600">載入失敗或找不到文章：${err.message}</div>`;
    console.error('單篇載入錯誤', err);
  }
}
