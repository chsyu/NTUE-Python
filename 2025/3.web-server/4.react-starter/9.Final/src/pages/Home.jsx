import { usePosts } from '../hooks'
import PostCard from '../components/PostCard'

function Home() {
   const { data: posts, isLoading, error } = usePosts()
   const truncatedContent = content => content ?
      content.replace(/<[^>]*>/g, '').substring(0, 30) + ' ' :
      'No content'

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
            <p className="text-red-900 mb-4">載入失敗: {error.message}</p>
         </div>
      )
   }

   return (
      <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl font-bold text-center mb-8">最新文章</h1>
         {posts && posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {posts.map((post) => (
                  <PostCard key={post.id} post={post} truncatedContent={truncatedContent(post.content)} />
               ))}
            </div>
         ) : (
            <div className="text-center">
               <p className="text-gray-600">目前沒有文章</p>
            </div>
         )}
      </div>
   )
}

export default Home