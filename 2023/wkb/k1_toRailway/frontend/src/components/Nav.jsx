import { Link } from "react-router-dom";

function Nav() {
   return (
     <nav className="navbar fixed-top navbar-expand-md navbar-dark nav__bg">
       <div className="container">
         <Link className="navbar-brand nav__brand" to="/">
           山‘s 網頁
         </Link>
         <button
           className="navbar-toggler"
           type="button"
           data-toggle="collapse"
           data-target="#navbarSupportedContent"
           aria-controls="navbarSupportedContent"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span className="navbar__icon-bar"></span>
           <span className="navbar__icon-bar"></span>
         </button>

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav ml-auto navbar-nav__full-screen">
             <li className="nav-item nav-item__full-screen">
               <a className="nav-link" href="#">
                 關於課程
               </a>
             </li>
             <li className="nav-item nav-item__full-screen">
               <a className="nav-link" href="#">
                 關於我
               </a>
             </li>
           </ul>
         </div>
       </div>
     </nav>
   );
}
export default Nav;