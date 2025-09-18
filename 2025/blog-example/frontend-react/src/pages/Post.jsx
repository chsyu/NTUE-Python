import React, { useEffect } from 'react'
import { useLocation, useParams, useSearchParams, Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../api'

export default function Post() {
  const { slug: slugFromPath } = useParams()
  const [search] = useSearchParams()
  const location = useLocation()

  const slug = slugFromPath ?? search.get('slug')
  const id = search.get('id')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', slug ?? id],
    queryFn: () => fetchPost({ slug, id }),
    enabled: Boolean(slug ?? id)
  })

  // 相容舊連結：/post.html?slug=... -> /posts/:slug
  if (location.pathname === '/post.html' && data?.slug) {
    return <Navigate replace to={`/posts/${data.slug}`} />
  }

  useEffect(() => {
    if (data?.title) document.title = data.title
    return () => { document.title = '我的部落格' }
  }, [data?.title])

  if (!slug && !id) return <div className="text-rose-600">缺少 slug 或 id。</div>
  if (isLoading) return <div className="text-slate-500">載入中…</div>
  if (isError) return <div className="text-rose-600">載入失敗或找不到文章：{error.message}</div>

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold">{data.title}</h1>
      <p className="mt-1 text-sm text-slate-600">作者：{data.author ?? ''}</p>
      <div className="prose prose-slate max-w-none mt-4" dangerouslySetInnerHTML={{ __html: data.content || data.html || '' }} />
    </article>
  )
}
