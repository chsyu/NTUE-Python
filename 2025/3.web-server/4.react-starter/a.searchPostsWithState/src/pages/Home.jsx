import { useState, useMemo } from 'react'
import { usePosts } from '../hooks'
import PostCard from '../components/PostCard'

function Home() {
   const { data: posts, isLoading, error } = usePosts()
   const [searchTerm, setSearchTerm] = useState('')
   
   const truncatedContent = content => content ?
      content.replace(/<[^>]*>/g, '').substring(0, 30) + ' ' :
      'No content'

   const filteredPosts = useMemo(() => {
      // 如果沒有 posts 數據，返回空陣列
      if (!posts) {
         return []
      }
      
      // 如果沒有搜尋詞，返回所有 posts
      if (!searchTerm.trim()) {
         return posts
      }
      
      // 有搜尋詞時進行過濾
      return posts.filter(post => {
         const title = post.title?.toLowerCase() || ''
         const content = post.content?.replace(/<[^>]*>/g, '').toLowerCase() || ''
         const search = searchTerm.toLowerCase()
         
         return title.includes(search) || content.includes(search)
      })
   }, [posts, searchTerm])

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
         {/* 搜尋輸入框 */}
         <div className="mb-8">
            <div className="relative max-w-md mx-auto">
               <input
                  type="text"
                  placeholder="搜尋文章..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
               />
               <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
               </div>
               {searchTerm && (
                  <button
                     onClick={() => setSearchTerm('')}
                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               )}
            </div>
         </div>

         <h1 className="text-4xl font-bold text-center mb-8">
            {searchTerm ? `搜尋結果: "${searchTerm}"` : '最新文章'}
         </h1>
         
         {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} truncatedContent={truncatedContent(post.content)} />
               ))}
            </div>
         ) : (
            <div className="text-center">
               <p className="text-gray-600">
                  {searchTerm ? `找不到包含 "${searchTerm}" 的文章` : '目前沒有文章'}
               </p>
            </div>
         )}
      </div>
   )
}

export default Home