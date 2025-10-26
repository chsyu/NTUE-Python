import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  timeout: 10000
})

export async function fetchPosts() {
  try {
    console.log('Fetching posts from API...')
    const res = await api.get('/posts')
    console.log('Posts response:', res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

export async function fetchPost({ slug }) {
  try {
    console.log('Fetching post with slug:', slug)
    const res = await api.get(`/posts/${encodeURIComponent(slug)}`)
    console.log('Post response:', res.data)
    return res.data
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error
  }
}
