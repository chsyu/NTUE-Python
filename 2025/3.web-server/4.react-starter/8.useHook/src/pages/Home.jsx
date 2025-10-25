import { Link } from 'react-router-dom'
import { usePosts } from '../hooks'

function Home() {
   const { data: posts, isLoading, error } = usePosts()

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (error) {
      return <div>Error: {error.message}</div>
   }
   
   return (
      <div>
         <h1 className="text-4xl font-bold text-center mb-8">最新文章</h1>
         {posts.map((post) => (
            <Link to={`/post/${post.slug}`} key={post.id}>
               <h1>{post.title}</h1>
               <h2 className="mb-4">{post.slug}</h2>
            </Link>
         ))}
      </div>
   )
}

export default Home