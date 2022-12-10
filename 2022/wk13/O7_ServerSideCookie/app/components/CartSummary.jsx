'use client'
import React, { useState, useEffect } from "react";
import { Badge } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Cookie from "js-cookie"

import { CartIcon } from "./Icons";
import CartModal from "./CartModal";
import { selectCartItems, setCartItems } from "../redux/cartSlice";

export default function CartSummary( {initCartItems} ) {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const count = (cartItems.length > 0) ?
  cartItems.reduce((sum, item) => sum + item.qty, 0)
  : 0;

  useEffect(() => {
    console.log('init cartItems')
    console.log({cartItems, initCartItems})
    if(cartItems.length == 0 && !!initCartItems)
      dispatch(setCartItems(initCartItems))
  }, [])

  useEffect(() => {
    console.log('check cartItems ...')
    console.log({cartItems, initCartItems})
    if(cartItems.length != 0){
      console.log('cartItems is not empty')
      console.log({cartItems})
      Cookie.set("cartItems", JSON.stringify(cartItems));}
  }, [cartItems])


  return (
    <>
      <nav onClick={toggleModal} className="header-cart-summary" >
        <Badge count={count} className='cart-summary-outlined' >
          <CartIcon />
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
