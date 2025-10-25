import { Link } from 'react-router-dom'

function Header() {
   return (
      <header className="container mx-auto px-4 md:px-8 lg:px-10 py-5 flex items-center gap-4 border-b border-slate-200">
         <Link to="/" className="font-extrabold tracking-widest text-slate-800 hover:text-slate-900">LOGO</Link>
         <h1 className="text-xl md:text-2xl font-semibold">我的部落格</h1>
      </header>
   )
}

export default Header