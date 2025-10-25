import { useParams } from 'react-router-dom'
import { usePost } from '../hooks'

function Post() {
  const { slug } = useParams()
  const { data: post, isLoading, error } = usePost(slug)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default Post