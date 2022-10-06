import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { selectUserInfo, selectIsRemember } from "../redux/usersSlice";

export default function UserInfo(props) {
   const userInfo = useSelector(selectUserInfo);
   const isRemember = useSelector(selectIsRemember)
   const navigate = useNavigate();

   const goToProfile = () => {
      navigate("/auth/login?redirect=profile");
   };

   useEffect(() => {
      if (isRemember)
         localStorage.setItem("userInfo", JSON.stringify(userInfo));
      else
         localStorage.removeItem("userInfo");
   }, [userInfo, isRemember]);

   return (

      <nav onClick={goToProfile} style={{ ...props.style }} className="header-cart-summary" >
         {userInfo
            ? <UserOutlined style={{ fontSize: '28px', color: '#ddd' }} />
            : <UserSwitchOutlined style={{ fontSize: '28px', color: '#ddd' }} />

         }
         <p className="userInfo-text">
            {userInfo
               ? `${userInfo.username}'s`
               : `請登入`
            }
         </p>
      </nav>

   );
}
