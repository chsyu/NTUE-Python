import {
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
} from "../utils/constants";

export const addCartItem = (product, qty) => (dispatch) => {
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

export const removeCartItem = (productId) => (dispatch) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};


