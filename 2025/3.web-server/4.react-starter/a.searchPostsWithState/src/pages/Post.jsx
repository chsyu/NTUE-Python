import { useParams } from 'react-router-dom'
import { usePost } from '../hooks'

function Post() {
  const { slug } = useParams()
  const { data: post, isLoading, error } = usePost(slug)

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
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-6">
          <span className="mr-4">發布日期: {post.date}</span>
          <span className="mr-4">作者: {post.author}</span>
          {post.tags && (
            <div className="flex gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>
      
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
   
    </article>
  )
}

export default Post