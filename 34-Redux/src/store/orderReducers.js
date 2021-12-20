import {
  BEGIN_ORDER_CREATE,
  SUCCESS_ORDER_CREATE,
  FAIL_ORDER_CREATE,
  RESET_ORDER,
  BEGIN_ORDER_DETAIL,
  SUCCESS_ORDER_DETAIL,
  FAIL_ORDER_DETAIL,
} from "../utils/constants";

export const orderCreateReducer = (state = {
    loading: false,
    order:{ id: "" },
    success: false,
    error: null,
  }, action) => {
  switch (action.type) {
    case BEGIN_ORDER_CREATE:
      return {
          ...state,
          loading: true,
          success: false,
        };
    case SUCCESS_ORDER_CREATE:
      return {
          ...state,
          loading: false,
          order: action.payload,
          success: true,
          error: null,
        };
    case FAIL_ORDER_CREATE:
      return{
          ...state,
          loading: false,
          order: { id: "" },
          success: false,
          error: action.payload,
        };
    case RESET_ORDER:
      return {
          ...state,
          loading: false,
          order: { id: "" },
          success: false,
        };
    default:
      return state;
  }
}

export const orderDetailReducer = (state = {
    loading: true,
    order: { cartItems: [] },
    error: null,
  }, action) => {
  switch (action.type) {

    case BEGIN_ORDER_DETAIL:
      return {
          ...state,
          loading: true,
        };
    case SUCCESS_ORDER_DETAIL:
      return {
          ...state,
          loading: false,
          order: action.payload,
        };
    case FAIL_ORDER_DETAIL:
      return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
}
