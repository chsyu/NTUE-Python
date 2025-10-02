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

  if (isLoading) return <div className="text-slate-500">載入中…</div>
  if (isError) return <div className="text-rose-600">讀取失敗：{error.message}</div>
  if (!data || data.length === 0) return <div className="text-slate-500">目前沒有文章。</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(post => <Card key={post.id ?? post.slug} post={post} />)}
    </div>
  )
}
