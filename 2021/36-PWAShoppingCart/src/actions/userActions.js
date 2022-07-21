import {
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
} from "../utils/constants";
import {
  signInWithEmailPassword,
  registerWithEmailPassword,
  updateProfile,
} from "../api";

export const login = (userInfo) => async (dispatch) => {
  dispatch({ type: BEGIN_LOGIN_REQUEST });
  try {
    const res = await signInWithEmailPassword(
      userInfo.email,
      userInfo.password
    );
    console.log("after login ...");
    console.log(res);
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

export const register = (userInfo) => async (dispatch) => {
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

export const rememberLoginUser = (remember) => (dispatch) => {
  dispatch({
    type: REMEMBER_LOGIN,
    payload: remember,
  });
};

export const updateUserInfo = (userInfo) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  localStorage.removeItem("userInfo");
};


