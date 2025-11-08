import {
  registerWithEmail,
  loginWithEmail,
  logout,
  fetchPosts,
  fetchPostBySlug,
  onAuthStateChange,
  auth,
} from "./firebase.js";

const statusEl = document.getElementById("status");
const postsOutput = document.getElementById("posts-output");

function setStatus(message, type = "info") {
  const colors = {
    info: "text-slate-300",
    success: "text-emerald-400",
    error: "text-red-400",
  };
  statusEl.className = `mt-8 text-sm ${colors[type] || colors.info}`;
  statusEl.textContent = message;
}

async function loadPosts() {
  try {
    const list = await fetchPosts();
    postsOutput.textContent = JSON.stringify(list, null, 2);
    setStatus(`已載入 ${list.length} 篇文章`, "success");
  } catch (err) {
    console.error(err);
    const msg = err?.message || err?.code || String(err);
    setStatus(`取得文章列表失敗：${msg}`, "error");
  }
}

async function loadPostBySlug() {
  const slug = document.getElementById("post-slug").value.trim();
  if (!slug) {
    setStatus("請輸入 slug", "error");
    return;
  }
  try {
    const post = await fetchPostBySlug(slug);
    postsOutput.textContent = JSON.stringify(post, null, 2);
    setStatus(`已取得文章：${post.title}`, "success");
  } catch (err) {
    console.error(err);
    const msg = err?.message || err?.code || String(err);
    setStatus(`取得文章失敗：${msg}`, "error");
  }
}

async function handleRegister() {
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const displayName = document.getElementById("register-display-name").value.trim();
  try {
    await registerWithEmail(email, password, displayName);
    const user = auth.currentUser;
    setStatus(`註冊成功，已登入：${user?.email ?? email}`, "success");
    await loadPosts();
  } catch (err) {
    console.error(err);
    const msg = err?.message || err?.code || String(err);
    setStatus(`註冊失敗：${msg}`, "error");
  }
}

async function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();
  try {
    await loginWithEmail(email, password);
    const user = auth.currentUser;
    setStatus(`登入成功：${user?.email ?? email}`, "success");
    await loadPosts();
  } catch (err) {
    console.error(err);
    const msg = err?.message || err?.code || String(err);
    setStatus(`登入失敗：${msg}`, "error");
  }
}

async function handleLogout() {
  try {
    await logout();
    postsOutput.textContent = "尚未載入";
    setStatus("已登出。", "info");
  } catch (err) {
    console.error(err);
    setStatus(`登出失敗：${err.message}`, "error");
  }
}

document.getElementById("register-btn").addEventListener("click", handleRegister);
document.getElementById("login-btn").addEventListener("click", handleLogin);
document.getElementById("logout-btn").addEventListener("click", handleLogout);
document.getElementById("load-posts").addEventListener("click", loadPosts);
document.getElementById("load-post").addEventListener("click", loadPostBySlug);

onAuthStateChange(async (user) => {
  if (user) {
    setStatus(`已登入：${user.email}`, "success");
    await loadPosts();
  } else {
    postsOutput.textContent = "尚未載入";
    setStatus("目前未登入。", "info");
  }
});
