import {
  SET_PAGE_TITLE,
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  SET_PRODUCT_DETAIL,
  BEGIN_PRODUCTS_REQUEST,
  SUCCESS_PRODUCTS_REQUEST,
  FAIL_PRODUCTS_REQUEST,
} from "../utils/constants";

export const productReducer = (
  state = {
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
    requestProducts: {
      loading: false,
      error: null,
    },
  },
  action
) => {
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
    default:
      return state;
  }
};
