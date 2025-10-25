import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../api'
import { Link } from 'react-router-dom'

function Card({ post }) {
  return (
    <Link to={`/posts/${post.slug ?? post.id}`} className="card">
      <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
      <p className="mt-1 text-sm text-slate-600">作者：{post.author ?? ''}</p>
    </Link>
  )
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  if (isLoading) return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
  if (isError) return <div className="text-rose-600">讀取失敗：{error.message}</div>
  if (!data || data.length === 0) return <div className="text-slate-500">目前沒有文章。</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(post => <Card key={post.id ?? post.slug} post={post} />)}
    </div>
  )
}
