import { Link } from 'react-router-dom'
import type { Post } from '../types'

type PostCardProps = {
  post: Post
  truncatedContent: string
}

function PostCard({ post, truncatedContent }: PostCardProps) {
      return (
         <Link
            to={`/post/${post.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer"
         >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">
               {truncatedContent}
               <span className="text-gray-400 italic"> ...more</span>
            </p>
         </Link>
      )
   }

export default PostCard
