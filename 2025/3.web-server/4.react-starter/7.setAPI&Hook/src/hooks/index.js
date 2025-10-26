import { useQuery } from '@tanstack/react-query'
import { fetchPosts, fetchPost } from '../api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

export function usePost(slug) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost({ slug }),
    enabled: !!slug, // 只有當 slug 存在時才執行查詢
  })
}
