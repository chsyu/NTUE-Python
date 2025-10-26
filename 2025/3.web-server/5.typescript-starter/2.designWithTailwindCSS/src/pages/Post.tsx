import { useParams } from 'react-router-dom'

function Post() {
  const { slug } = useParams()
  return (
    <div>
      <h1 className="text-4xl font-bold">Post Page: {slug}</h1>
    </div>
  )
}

export default Post