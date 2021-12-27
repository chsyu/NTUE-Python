import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./cartReducers";
import {
  orderCreateReducer,
  orderDetailReducer,
} from "./orderReducers";
import {
  productReducer,
} from "./productReducers";
import {
  userRegisterReducer,
  userSigninReducer,
} from "./userReducers";

let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    remember: true,
    error: "",
  },
  orderInfo: {
    loading: false,
    order: localStorage.getItem("orderInfo")
      ? JSON.parse(localStorage.getItem("orderInfo"))
      : { id: "" },
    success: false,
    error: null,
  },
  cart: {
    cartItems,
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Google",
  },
};
const reducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderInfo: orderCreateReducer,
  orderDetail: orderDetailReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;


