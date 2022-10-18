import NavBar from "./NavBar";
import { Skeleton } from "antd";
import { Link } from "react-router-dom"
import CartSummary from "./CartSummary";
import UserInfo from "./UserInfo";

export default function Header({ title, isLoading }) {
   return (
      <div className="header">
         <div className="header-wrap">
            <div className="header-text">
               <Link to="/">
                  <Skeleton loading={isLoading} active>
                     <h1 className="header-title">
                        {title}
                     </h1>
                  </Skeleton>
               </Link>

               <p
                  className="header-slogan">
                  An example made by Create-React-App.
               </p>
            </div>

            <div className="header-right">
               <UserInfo className="header-userInfo" />
               <CartSummary />
            </div>
         </div>

         <hr className="hr-header-line" />
         <NavBar />
      </div>
   );
}