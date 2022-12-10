import NavBar from "./NavBar";
import Link from 'next/link';
import { cookies } from 'next/headers';

import CartSummary from "./CartSummary";
import UserInfo from "./UserInfo";

export default function Header({ title }) {
   const nextCookies = cookies(); // Get cookies object
   const _cartItems = nextCookies.get('cartItems') // Find cookie
   const initCartItems = JSON.parse(_cartItems.value)
   return (
      <div className="header">
         <div className="header-wrap">
            <div className="header-text">
               <Link href="/">
                  <h1 className="header-title">
                     {title}
                  </h1>
               </Link>

               <p
                  className="header-slogan">
                  An example made by Create-Next-App.
               </p>
            </div>
            <div className="header-right">
               <UserInfo className="header-userInfo" />
               <CartSummary initCartItems={initCartItems} />
            </div>
         </div>

         <hr className="hr-header-line" />
         <NavBar />
      </div>
   );
}