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
} from "../utils/constants";
import {
  getProducts,
  getProductById,
  signInWithEmailPassword,
  registerWithEmailPassword,
} from "../api";
export const addCartItem = (dispatch, product, qty) => {
  const item = {
    id: product.id,
    category: product.category,
    name: product.name,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    qty,
  };
  dispatch({
    type: ADD_CART_ITEM,
    payload: item,
  });
};

export const removeCartItem = (dispatch, productId) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};

export const setProductDetail = async (dispatch, productId, qty) => {
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  try {
    const product = await getProductById(productId);
    if (qty === 0)
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
        },
      });
    else
      dispatch({
        type: SET_PRODUCT_DETAIL,
        payload: {
          product,
          qty,
        },
      });
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
};

export const setPage = async (dispatch, url, title) => {
  let products = [];
  dispatch({ type: BEGIN_PRODUCTS_REQUEST });
  dispatch({
    type: SET_PAGE_TITLE,
    payload: title,
  });
  try {
    products = await getProducts(url);
    dispatch({
      type: SET_PAGE_CONTENT,
      payload: { title, products },
    });
    dispatch({
      type: SET_NAVBAR_ACTIVEITEM,
      payload: url,
    });
    dispatch({ type: SUCCESS_PRODUCTS_REQUEST });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PRODUCTS_REQUEST, payload: error });
  }
};

export const login = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_LOGIN_REQUEST });
  try {
    const res = await signInWithEmailPassword(
      userInfo.email,
      userInfo.password
    );

    if (res.status == '200') {
      dispatch({
        type: SUCCESS_LOGIN_REQUEST,
        payload: res.user,
      });
      return res.user;
    } else {
      dispatch({
        type: FAIL_LOGIN_REQUEST,
        payload: `${res.status} error!
        ${res.detail}`,
      });      
      return null;
    }

  } catch (e) {
    console.log(e);
    dispatch({
      type: FAIL_LOGIN_REQUEST,
      payload: e,
    });
    console.log(e);
    return null;
  }
};

export const register = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_REGISTER_REQUEST });
  try {
    const res = await registerWithEmailPassword(
      userInfo.email,
      userInfo.password,
      userInfo.username
    );

    if (res.status == "200") {
      dispatch({
        type: SUCCESS_REGISTER_REQUEST,
        payload: res.user,
      });
      return res.user;
    } else {
      dispatch({
        type: FAIL_REGISTER_REQUEST,
        payload: `${res.status} error!
        ${res.detail}`,
      });
      return null;
    }
  } catch (e) {
    dispatch({
      type: FAIL_REGISTER_REQUEST,
      payload: e,
    });
    console.log(e);
    return null;
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
};
