import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD
} from "../utils/constants";

export const cartReducer = (state = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "Google",
  }, action) => {
  let cartItems = [];
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.id === item.id);
      if (product) {
        cartItems = state.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        return { ...state, cartItems };
      }
      cartItems = [...state.cartItems, item];
      return { ...state, cartItems};
    case REMOVE_CART_ITEM:
      cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      return { ...state, cartItems };
    case SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
}