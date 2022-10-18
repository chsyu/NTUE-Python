import NavBar from "./NavBar";
import { Link } from "react-router-dom"
import CartSummary from "./CartSummary";

export default function Header({ title, isLoading }) {
   return (
      <div className="header">
         <div className="header-wrap">
            <div className="header-text">
               <Link to="/">
                  <h1 className="header-title">
                     {title}
                  </h1>
               </Link>

               <p
                  className="header-slogan">
                  An example made by Create-React-App.
               </p>
            </div>

            <div className="header-right">
               <CartSummary />
            </div>
         </div>

         <hr className="hr-header-line" />
         <NavBar />
      </div>
   );
}