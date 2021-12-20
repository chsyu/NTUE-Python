import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';


export default function UserInfo(props) {

   const { userInfo, remember } = useSelector((state) => state.userSignin);

   const history = useHistory();

   const goToProfile = () => {
      history.push("/login?redirect=profile");
   };

   useEffect(() => {
      if(remember)
         localStorage.setItem("userInfo", JSON.stringify(userInfo));
      else
       localStorage.removeItem("userInfo");
   }, [userInfo, remember]);

   return (
      <>
         <nav onClick={goToProfile} style={{ ...props.style }} className="header-cart-summary" >
            {userInfo
               ? <UserOutlined style={{ fontSize: '28px', color: '#ddd' }} />
               : <UserSwitchOutlined style={{ fontSize: '28px', color: '#ddd' }} />

            }
            <p className="cart-summary-text">
               {userInfo
                  ? `${userInfo.username}'s`
                  : `請登入`
               }
            </p>
         </nav>
      </>
   );
}
