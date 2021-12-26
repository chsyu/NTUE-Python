import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, notification } from "antd"
import { CartIcon } from "./Icons";
import { addCartItem } from "../actions/cartActions";

export default function AddToCart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { product, qty } = useSelector((state) => state.product.productDetail);
  const dispatch = useDispatch();

  const openNotification = () => {
    notification.open({
      message: 'Shopping Notification',
      description:
        `${qty} ${qty > 1 ? "pieces" : "piece"} of ${product.name} ${qty > 1 ? "have" : "has"} been added to your cart.`,
      onClick: () => {
        console.log('Notification Clicked!');
      },
      placement: 'bottomRight'
    });
  };

  const addToCart = () => {
    openNotification();
    dispatch(addCartItem(product, qty));
  };

  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <Button type="primary" className="btn-tocar" onClick={addToCart}>
      <CartIcon size={20} />
      <span style={{ marginLeft: 12 }}>Add To Shopping Bag</span>
    </Button>
  );
}
