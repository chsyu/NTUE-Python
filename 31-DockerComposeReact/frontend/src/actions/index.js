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
  BEGIN_UPDATE_USERINFO,
  SUCCESS_UPDATE_USERINFO,
  FAIL_UPDATE_USERINFO,
  LOGOUT_REQUEST,
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
import {
  getProducts,
  getProductById,
  signInWithEmailPassword,
  registerWithEmailPassword,
  updateProfile,
  createOrderApi,
  getOrderById,
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
    console.log('after login ...')
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: SUCCESS_LOGIN_REQUEST,
        payload: res.user,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.user));
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

    if (res.status === 200) {
      dispatch({
        type: SUCCESS_REGISTER_REQUEST,
        payload: res.user,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.user));
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

export const rememberLoginUser = (dispatch, remember) => {
  dispatch({
    type: REMEMBER_LOGIN,
    payload: remember,
  });
};

export const updateUserInfo = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_UPDATE_USERINFO });
  try {
    const res = await updateProfile(
      userInfo.username,
      userInfo.password,
      userInfo.address || "",
      userInfo.tel || "",
      userInfo.access_token,
      userInfo.user_id
    );

    if (res.status === 200) {
      dispatch({
        type: SUCCESS_UPDATE_USERINFO,
        payload: res.user,
      });
      localStorage.setItem("userInfo", JSON.stringify(res.user));
      return res.user;
    } else {
      dispatch({
        type: FAIL_UPDATE_USERINFO,
        payload: `${res.status} error!
        ${res.detail}`,
      });
      return null;
    }
  } catch (e) {
    dispatch({
      type: FAIL_UPDATE_USERINFO,
      payload: e,
    });
    console.log(e);
    return null;
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.removeItem("userInfo");
};

export const saveShippingAddress = (dispatch, shippingAddress) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
}

export const savePaymentMethod = (dispatch, paymentMethod) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: paymentMethod.paymentMethod,
  });
}


export const createOrder = async (dispatch, cart, userInfo) => {
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
      ...userInfo
    };    
    const res = await createOrderApi(item, userInfo.access_token);

    if (res.status === 200) {
      dispatch({ 
        type: SUCCESS_ORDER_CREATE, 
        payload: res.order 
      });
      localStorage.setItem('orderInfo', JSON.stringify(res.order));
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
}

export const requestOrderDetail = async (dispatch, orderId) => {
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

export const resetOrder = (dispatch) => {
  dispatch({ type: RESET_ORDER });
};