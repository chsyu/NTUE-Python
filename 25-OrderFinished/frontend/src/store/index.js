import { createContext, useEffect } from "react";
import useReducerWithThunk from "use-reducer-thunk";
import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
  BEGIN_LOGIN_REQUEST,
  SUCCESS_LOGIN_REQUEST,
  FAIL_LOGIN_REQUEST,
  BEGIN_REGISTER_REQUEST,
  SUCCESS_REGISTER_REQUEST,
  FAIL_REGISTER_REQUEST,
  LOGOUT_REQUEST,
  BEGIN_UPDATE_USERINFO,
  SUCCESS_UPDATE_USERINFO,
  FAIL_UPDATE_USERINFO,
  REMEMBER_LOGIN,
  BEGIN_ORDER_CREATE,
  SUCCESS_ORDER_CREATE,
  FAIL_ORDER_CREATE,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
  RESET_ORDER,
  BEGIN_ORDER_DETAIL,
  SUCCESS_ORDER_DETAIL,
  FAIL_ORDER_DETAIL,
} from "../utils/constants";

export const StoreContext = createContext();
let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  allProducts: [],
  page: {
    title: "",
    products: [],
  },
  productDetail: {
    product: [],
    qty: 1,
  },
  navBar: {
    activeItem: "/",
  },
  cart: {
    cartItems,
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Google",
  },
  orderInfo: {
    loading: false,
    order: localStorage.getItem("orderInfo")
      ? JSON.parse(localStorage.getItem("orderInfo"))
      : { id: "" },
    success: false,
    error: null,
  },
  orderDetail: {
    loading: true,
    order: { cartItems: [] },
    error: null,
  },
  requestProducts: {
    loading: false,
    error: null,
  },
  userSignin: {
    loading: false,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    remember: true,
    error: "",
  },
  userRegister: {
    loading: false,
    userInfo: null,
    error: "",
  },
};

function reducer(state, action) {
  console.log(action.type)
  switch (action.type) {
    case SET_PAGE_TITLE:
      return {
        ...state,
        page: {
          ...state.page,
          title: action.payload,
        },
      };
    case SET_PAGE_CONTENT:
      return {
        ...state,
        page: action.payload,
      };
    case SET_NAVBAR_ACTIVEITEM:
      return {
        ...state,
        navBar: {
          activeItem: action.payload,
        },
      };
    case ADD_CART_ITEM:
      const item = action.payload;
      const product = state.cart.cartItems.find((x) => x.id === item.id);
      if (product) {
        cartItems = state.cart.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        return { ...state, cart: { ...state.cart, cartItems } };
      }
      cartItems = [...state.cart.cartItems, item];
      return { ...state, cart: { ...state.cart, cartItems } };
    case REMOVE_CART_ITEM:
      cartItems = state.cart.cartItems.filter((x) => x.id !== action.payload);
      return { ...state, cart: { ...state.cart, cartItems } };
    case SAVE_SHIPPING_ADDRESS:
      console.log("action.payload.shippingAddress = ");
      console.log(action.payload);
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: { ...state.productDetail, ...action.payload },
      };
    case BEGIN_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: true },
      };
    case SUCCESS_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: { ...state.requestProducts, loading: false },
      };
    case FAIL_PRODUCTS_REQUEST:
      return {
        ...state,
        requestProducts: {
          ...state.requestProducts,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_LOGIN_REQUEST:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_LOGIN_REQUEST:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case BEGIN_UPDATE_USERINFO:
      return { ...state, userSignin: { ...state.userSignin, loading: true } };
    case SUCCESS_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
      };
    case FAIL_UPDATE_USERINFO:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          loading: false,
          error: action.payload,
        },
      };
    case BEGIN_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: { ...state.userRegister, loading: true },
      };
    case SUCCESS_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: action.payload,
          error: "",
        },
        userSignin: {
          ...state.userSignin,
          userInfo: action.payload,
        },
      };
    case FAIL_REGISTER_REQUEST:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          loading: false,
          userInfo: null,
          error: action.payload,
        },
      };
    case LOGOUT_REQUEST:
      cartItems = [];
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          userInfo: null,
        },
      };
    case REMEMBER_LOGIN:
      return {
        ...state,
        userSignin: {
          ...state.userSignin,
          remember: action.payload,
        },
      };
    case BEGIN_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: true,
          success: false,
        },
      };
    case SUCCESS_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: action.payload,
          success: true,
          error: null,
        },
      };
    case FAIL_ORDER_CREATE:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: { id: "" },
          success: false,
          error: action.payload,
        },
      };
    case RESET_ORDER:
      return {
        ...state,
        orderInfo: {
          ...state.orderInfo,
          loading: false,
          order: { id: "" },
          success: false,
        },
      };
    case BEGIN_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: true,
        },
      };
    case SUCCESS_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: false,
          order: action.payload,
        },
      };
    case FAIL_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducerWithThunk(
    reducer,
    initialState,
    "example"
  );
  const value = { state, dispatch };

  useEffect(()=>{
    console.log(state)
  },[state])

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}
