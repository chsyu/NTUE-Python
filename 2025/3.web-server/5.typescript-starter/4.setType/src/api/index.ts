import axios from 'axios'
import type { Post, PostList } from '../types'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 10000
})

export async function fetchPosts(): Promise<PostList> {
  const res = await api.get<PostList>('/posts')
  return res.data
}

export async function fetchPost(slug: string): Promise<Post> {
  const res = await api.get<Post>(`/posts/${encodeURIComponent(slug)}`)
  return res.data
}
