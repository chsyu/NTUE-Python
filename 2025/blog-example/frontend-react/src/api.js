import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 10000
})

export async function fetchPosts() {
  const res = await api.get('/posts')
  return res.data
}

export async function fetchPost({ slug, id }) {
  const key = slug ?? id
  const res = await api.get(`/posts/${encodeURIComponent(key)}`)
  return res.data
}
