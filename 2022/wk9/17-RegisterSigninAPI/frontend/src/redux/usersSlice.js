import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  signInWithEmailPassword,
  registerWithEmailPassword,
  updateProfile,
} from "../api";

// Define initialState 
const initialState = { 
  isLoading: false, 
  userInfo: null, 
  error: null,
  isRemember: true,
};

// Define async functions
export const login = createAsyncThunk(
  'users/login',
  async (userInfo) => {
    try {
      const res = await signInWithEmailPassword(
        userInfo.email,
        userInfo.password
      );
      // The value we return becomes the `fulfilled` action payload
      return res;
    } catch (res) {
      return res;
    }

  }
);

export const register = createAsyncThunk(
  'users/register',
  async (userInfo) => {
    try {
      const res = await registerWithEmailPassword(
        userInfo.email,
        userInfo.password,
        userInfo.username
      );
      // The value we return becomes the `fulfilled` action payload
      return res;
    } catch (res) {
      return res;
    }
  }
);

export const update = createAsyncThunk(
  'users/update',
  async (userInfo) => {
    try {
      const res = await updateProfile(
        userInfo.username,
        userInfo.password,
        userInfo.address || "",
        userInfo.tel || "",
        userInfo.access_token,
        userInfo.user_id
      );
      // The value we return becomes the `fulfilled` action payload
      return res;
    } catch (res) {
      return res;
    }

  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
    remember: (state) => {
      state.isRemember = state.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersInfo = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersInfo = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersInfo = action.payload;
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

// export state to global
export const selectUserInfo = (state) => state.users.userInfo;
export const selectError = (state) => state.users.error;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectIsRemember = (state) => state.users.isRemember;

// export actions to global
export const { logout, remember } = usersSlice.actions;

// export reducer to global
export default usersSlice.reducer;
