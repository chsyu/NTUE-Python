import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-4 md:px-8 lg:px-10 py-5 flex items-center gap-4 border-b border-slate-200">
        <Link to="/" className="font-extrabold tracking-widest text-slate-800 hover:text-slate-900">LOGO</Link>
        <h1 className="text-xl md:text-2xl font-semibold">我的部落格</h1>
      </header>
      <main className="container mx-auto px-4 md:px-8 lg:px-10 py-6">
        <Outlet />
      </main>
    </div>
  )
}
