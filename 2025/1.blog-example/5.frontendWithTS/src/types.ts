// 根據後台 Pydantic Post 模型定義的 TypeScript 型別

export type Post = {
  id: number;
  slug: string;
  title: string;
  author: string;
  content: string;
}

// API 回應型別
export type PostList = Post[];
export type PostResponse = Post;

// API 錯誤型別
export type ApiError = {
  message: string;
  detail?: string;
}

// API 函數參數型別
export type FetchPostParams = {
  slug: string;
}