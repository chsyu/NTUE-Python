import { useState, useContext } from "react";
import { useSelector } from "react-redux";

import { Badge } from "antd";
import { CartIcon } from "./Icons";
import CartModal from "./CartModal";

export default function CartSummary() {

  const { cartItems } = useSelector((state) => state.cart);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const count = (cartItems.length > 0) ?
    cartItems.reduce((sum, item) => sum + item.qty, 0)
    : 0;

  return (
    <>
      <nav onClick={toggleModal} className="header-cart-summary" >
        <Badge count={count} size={"small"} style={{ color: 'white', backgroundColor: '#6366F2' }}>
          <CartIcon size={32} />
        </Badge>
        <p className="cart-summary-text"> Shopping bag </p>
      </nav>
      <CartModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </>
  );
}
