import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import productFormReducer from './productFormSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    productForm: productFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
