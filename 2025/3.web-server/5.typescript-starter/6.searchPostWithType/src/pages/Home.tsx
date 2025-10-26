import { useState, useMemo, useEffect } from 'react'
import { usePosts } from '../hooks'
import PostCard from '../components/PostCard'
import SearchInput from '../components/SearchInput'

function Home() {
   const { data: posts, isLoading, error } = usePosts()
   const [searchTerm, setSearchTerm] = useState('')
   
   const truncatedContent = (content?: string) => content ?
      content.substring(0, 30) + ' ' :
      'No content'

   // 使用 useMemo 進行搜尋
   const filteredPosts = useMemo(() => {
      // if (!posts) return []
      if (!searchTerm.trim()) return posts
      
      return posts?.filter(post => {
         const title = post.title?.toLowerCase() || ''
         const content = post.content?.toLowerCase() || ''
         const search = searchTerm.toLowerCase()
         return title.includes(search) || content.includes(search)
      })
   }, [posts, searchTerm])

   // 設置頁面標題
   useEffect(() => {
      document.title = '我的部落格 - 首頁'
   }, [])

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
         <SearchInput value={searchTerm} onChange={setSearchTerm} />
         <h1 className="text-4xl font-bold text-center mb-8">
            {searchTerm ? `搜尋結果: "${searchTerm}"` : '最新文章'}
         </h1>         
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts?.map((post) => (
               <PostCard key={post.id} post={post} truncatedContent={truncatedContent(post.content)} />
            ))}
         </div>
         
      </div>
   )
}

export default Home