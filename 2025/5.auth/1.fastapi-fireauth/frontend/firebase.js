// frontend/firebase.js
// 在傳統 HTML 頁面中以 <script type="module" src="./firebase.js"></script> 引入
// 需搭配 Firebase Web SDK 與 Axios 的 CDN 版本（此檔案以 ESM import 直接載入）

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm";

const env = window.__ENV || {};

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  appId: env.FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error("Firebase config 環境變數未正確設定，請確認 env.js");
}

export const API_BASE_URL = env.API_BASE_URL || "http://localhost:8000";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

async function getCurrentIdToken(forceRefresh = false) {
  const user = auth.currentUser;
  if (!user) throw new Error("尚未登入");
  return await user.getIdToken(forceRefresh);
}

export async function registerWithEmail(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(user, { displayName });
  }
  return user;
}

export async function loginWithEmail(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function logout() {
  await signOut(auth);
}

export async function fetchPosts({ baseUrl = API_BASE_URL, authToken } = {}) {
  const token = authToken || (await getCurrentIdToken());
  const response = await axios.get(`${baseUrl}/posts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function fetchPostBySlug(slug, { baseUrl = API_BASE_URL, authToken } = {}) {
  if (!slug) throw new Error("slug 不可為空");
  const token = authToken || (await getCurrentIdToken());
  const response = await axios.get(`${baseUrl}/post/${slug}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}

window.firebaseAuthClient = {
  auth,
  registerWithEmail,
  loginWithEmail,
  logout,
  fetchPosts,
  fetchPostBySlug,
  onAuthStateChange,
};

console.info("firebase.js 已載入，請使用 window.firebaseAuthClient.* 進行操作");
