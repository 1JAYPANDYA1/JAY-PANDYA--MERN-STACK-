
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkUser = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/check', {}, 
        { withCredentials: true }
      );
      console.log("res : ",response)
      return response.data;
    } catch (error) {
      console.log("error : ",error)
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: Date.now().toString(),
        price: Math.max(1, +action.payload.price),
        quantity: Math.max(1, +action.payload.quantity),
      });
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          price: Math.max(1, +action.payload.price),
          quantity: Math.max(1, +action.payload.quantity),
        };
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload.id);
    },
    incrementProductQuantity: (state, action) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementProductQuantity: (state, action) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  incrementProductQuantity,
  decrementProductQuantity,
} = productSlice.actions;

export default productSlice.reducer;