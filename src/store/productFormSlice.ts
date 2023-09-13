import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseURL } from '../constants/general';
import { ProductFormState } from './Interfaces';

const initialState: ProductFormState = {
  product: {
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [''],
  },
  loading: false,
  error: null,
};

// Define an async thunk to create a product
const createProduct = createAsyncThunk(
  'products/create',
  async (productData, thunkAPI) => {
    try {
      const response = await fetch(`${baseURL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const productFormSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = initialState.product;
        console.log('response action.payload', action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export { createProduct };

export default productFormSlice.reducer;
