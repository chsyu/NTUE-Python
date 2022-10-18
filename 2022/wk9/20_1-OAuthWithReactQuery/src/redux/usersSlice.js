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
    }
  },
});

// export state to global
export const selectUserInfo = (state) => state.users.userInfo;
export const selectIsRemember = (state) => state.users.isRemember;

// export actions to global
export const { logout, remember, setUser } = usersSlice.actions;

// export reducer to global
export default usersSlice.reducer;
