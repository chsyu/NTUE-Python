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
  FAIL_UPDATE_USERINFO
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
  cartItems,
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
      const product = state.cartItems.find((x) => x.id === item.id);
      if (product) {
        cartItems = state.cartItems.map((x) =>
          x.id === product.id ? item : x
        );
        return { ...state, cartItems };
      }
      cartItems = [...state.cartItems, item];
      return { ...state, cartItems };
    case REMOVE_CART_ITEM:
      cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      return { ...state, cartItems };
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
