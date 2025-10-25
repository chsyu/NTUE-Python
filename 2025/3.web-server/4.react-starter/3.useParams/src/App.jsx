import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Post from './pages/Post'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="post/:slug" element={<Post />} />
    </Routes>
  )
}

export default App
