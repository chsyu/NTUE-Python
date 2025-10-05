import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchPost } from '../api'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [slug],
    queryFn: () => slug ? fetchPost({ slug }) : Promise.reject(new Error('缺少 slug')),
    enabled: !!slug
  })

  useEffect(() => {
    if (data?.title) document.title = data.title
    return () => { document.title = '我的部落格' }
  }, [data?.title])

  if (!slug) return <div className="text-rose-600">缺少 slug id。</div>
  if (isLoading) return <div className="text-slate-500">載入中…</div>
  if (isError) return <div className="text-rose-600">載入失敗或找不到文章：{error?.message}</div>

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-2xl md:text-3xl font-bold">{data?.title}</h1>
      <p className="mt-1 text-sm text-slate-600">作者：{data?.author ?? ''}</p>
      <div className="prose prose-slate max-w-none mt-4" dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
    </article>
  )
}
