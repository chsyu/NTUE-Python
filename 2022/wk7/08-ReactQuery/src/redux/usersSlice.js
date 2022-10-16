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
      console.log('res = ')
      console.log(res)
      // The value we return becomes the `fulfilled` action payload
      return res;
    } catch (res) {
      console.log('res error = ')
      console.log(res)
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
      return { status: res.status, user: res.data };
    } catch (err) {
      return { status: err.response.status, detail: err.response.data.detail };
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
      if (res.status === 200) {
        return res.user;
      } else {
        return `${res.status} error!
        ${res.detail}`;
      }
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
      state.error = null;
    },
    remember: (state, action) => {
      state.isRemember = action.payload;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.userInfo = null;
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login.fulfilled')
        console.log(action.payload);
        state.isLoading = false;
        if (action.payload.status === 200) {
          state.userInfo = action.payload.user;
          state.error = null;
        } else {
          state.error = `${action.payload.status} error!
          ${action.payload.detail}`;
          state.userInfo = null;
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login.rejected')
        console.log(action);
        state.isLoading = false;
        state.error = action.payload.detail;
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
export const { logout, remember, setUser, setError } = usersSlice.actions;

// export reducer to global
export default usersSlice.reducer;
