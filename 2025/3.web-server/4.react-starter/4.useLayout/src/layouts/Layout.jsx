import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="app">
      <Header />
      
      {/* Main Content - 這裡會渲染子路由的內容 */}
      <main className="main-content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout