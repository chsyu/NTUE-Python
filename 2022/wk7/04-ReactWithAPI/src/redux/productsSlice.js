import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getProducts, getProductById } from '../api';

// Part1: Define Slice (including reducers and actions)

// Define initialState 
const initialState = { isLoading: false, productContent: {}, productsContent: [] };

// Define async functions
export const getProductsAsync = createAsyncThunk(
  'products/getproducts',
  async (url) => {
     const { data } = await getProducts(url);
     // The value we return becomes the `fulfilled` action payload
     return data;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  'products/getproductById',
  async (id) => {
     const data = await getProductById(id);
     // The value we return becomes the `fulfilled` action payload
     return data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productsContent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProductsAsync.pending, (state) => {
       state.isLoading = true;
    })
    .addCase(getProductsAsync.fulfilled, (state, action) => {
       state.isLoading = false;
       state.productsContent = action.payload;
    })
    .addCase(getProductByIdAsync.pending, (state) => {
      state.isLoading = true;
   })
   .addCase(getProductByIdAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productContent = action.payload;
      console.log('state = ')
      console.log(state)
   })
 },
});

// export state to global
export const selectProducts = (state) => state.products.productsContent;
export const selectProduct = (state) => state.products.productContent;

// export actions to global
export const { setProducts } = productsSlice.actions;

// export reducer to global
export default productsSlice.reducer;
