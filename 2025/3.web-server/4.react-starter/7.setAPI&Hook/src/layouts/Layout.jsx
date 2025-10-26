import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 lg:px-10 py-6 flex justify-center">
        <Outlet />
      </main>      
      <Footer />
    </div>
  )
}

export default Layout