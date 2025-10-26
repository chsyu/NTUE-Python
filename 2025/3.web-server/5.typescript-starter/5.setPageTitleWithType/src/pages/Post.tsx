import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { usePost } from '../hooks'

function Post() {
  const { slug } = useParams()
  const { data: post, isLoading, error } = usePost(slug!)

  // 設置頁面標題
  useEffect(() => {
    document.title = post?.title || '我的部落格'
  }, [post])

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">文章不存在</h1>
        <p className="text-gray-600 mb-6">找不到 slug 為 "{slug}" 的文章</p>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post?.title}</h1>
        <p className="mr-4">作者: {post?.author}</p>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <p>{post?.content}</p>
      </div>
   
    </article>
  )
}

export default Post