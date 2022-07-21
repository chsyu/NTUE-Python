import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
} from "../utils/constants";
import {
  getProducts,
  getProductById,
} from "../api";


export const setProductDetail = (productId, qty) => async (dispatch) => {
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

export const setPage = (url, title) => async (dispatch) => {
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
