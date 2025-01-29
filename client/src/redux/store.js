import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice'; 
import productReducer from '../redux/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
