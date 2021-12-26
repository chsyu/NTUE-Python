import {
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
} from "../utils/constants";

export const userRegisterReducer = (state = {
  loading: false,
  userInfo: null,
  error: "",
}, action) => {
  switch (action.type) {
    case BEGIN_REGISTER_REQUEST:
      return { ...state, loading: true };
    case SUCCESS_REGISTER_REQUEST:
      return {
          ...state,
          loading: false,
          userInfo: action.payload,
          error: "",
        };
    case FAIL_REGISTER_REQUEST:
      return {
          ...state,
          loading: false,
          userInfo: null,
          error: action.payload,
        };
    default:
      return state;
  }
};

export const userSigninReducer = (state = {
    loading: false,
    userInfo: null,
    remember: true,
    error: "",
  }, action) => {
   switch (action.type) {
     case BEGIN_LOGIN_REQUEST:
       return { ...state, loading: true };
     case SUCCESS_LOGIN_REQUEST:
       return {
         ...state,
         loading: false,
         userInfo: action.payload,
         error: "",
       };
     case FAIL_LOGIN_REQUEST:
       return {
         ...state,
         loading: false,
         userInfo: null,
         error: action.payload,
       };
     case LOGOUT_REQUEST:
       return {
         ...state,
         userInfo: null,
       };
     case REMEMBER_LOGIN:
       return {
         ...state,
         remember: action.payload,
       };
     case BEGIN_UPDATE_USERINFO:
       return { ...state, loading: true };
     case SUCCESS_UPDATE_USERINFO:
       return {
           ...state,
           loading: false,
           userInfo: action.payload,
           error: "",
         };
     case FAIL_UPDATE_USERINFO:
       return {
           ...state,
           loading: false,
           error: action.payload,
         };
     default:
       return state;
   }

}

