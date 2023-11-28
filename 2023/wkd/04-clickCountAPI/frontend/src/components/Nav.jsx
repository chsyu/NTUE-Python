import { Link } from "react-router-dom";


function Nav() {
   return (
     <nav className="navbar fixed-top navbar-expand-md navbar-dark nav__bg">
       <div className="container">
         <Link className="navbar-brand nav__brand" to="/">
           F2E‘s
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
         </div>
       </div>

     </nav>
   );
}
export default Nav;