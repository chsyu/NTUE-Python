import {
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
import {
  createOrderApi,
  getOrderById,
} from "../api";

export const saveShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod.paymentMethod,
  });
};

export const createOrder = (cart, userInfo) => async (dispatch) => {
  dispatch({ type: BEGIN_ORDER_CREATE });
  try {
    const item = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      ...userInfo,
    };
    const res = await createOrderApi(item, userInfo.access_token);

    if (res.status === 200) {
      dispatch({
        type: SUCCESS_ORDER_CREATE,
        payload: res.order,
      });
      localStorage.setItem("orderInfo", JSON.stringify(res.order));
      return res.order;
    } else {
      dispatch({
        type: FAIL_ORDER_CREATE,
        payload: `${res.status} error!
        ${res.detail}`,
      });
      return null;
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_ORDER_CREATE, payload: error });
    return null;
  }
};

export const requestOrderDetail = (orderId) => async (dispatch) => {
  dispatch({ type: BEGIN_ORDER_DETAIL });
  try {
    const res = await getOrderById(orderId);

    if (res.status === 200) {
      dispatch({
        type: SUCCESS_ORDER_DETAIL,
        payload: res.order,
      });
      localStorage.setItem("orderInfo", JSON.stringify(res.order));
      return res.order;
    } else {
      dispatch({
        type: FAIL_ORDER_DETAIL,
        payload: `${res.status} error!
        ${res.detail}`,
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: FAIL_ORDER_DETAIL,
      payload: error,
    });
  }
};

export const resetOrder = () => (dispatch) => {
  dispatch({ type: RESET_ORDER });
};
