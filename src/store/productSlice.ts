import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dataProduct, Product, ProductForm } from './Interfaces';
import { fullURL } from './utility';
import { baseURL } from '../constants/general';

const fetchProducts = createAsyncThunk(
  `products/fetchProduct`,
  async (_, { getState }) => {
    const currentState = getState() as dataProduct;
    const response = await fetch(fullURL({ currentState }));
    if (!response.ok) {
      throw new Error(`Failed to fetch`);
    }
    return response.json();
  },
);
const fetchOneProduct = createAsyncThunk(
  `products/fetchOneProduct`,
  async (id: number) => {
    const response = await fetch(`${baseURL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch`);
    }
    return response.json();
  },
);
const deleteOneProduct = createAsyncThunk(
  'products/deleteOneProduct',
  async (id: number) => {
    const response = await fetch(`${baseURL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return id;
  },
);
const updateOneProduct = createAsyncThunk(
  'products/updateOneProduct',
  async (product: ProductForm, thunkAPI) => {
    try {
      const response = await fetch(`${baseURL}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      console.log('response update', response);
      console.log('url', `${baseURL}/products/${String(product.id)}`);
      console.log('data', JSON.stringify(product));
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: {
      products: [] as Product[],
      total: 100,
      skip: 0,
      limit: 10,
    },
    singleProduct: {} as Product,
    loading: false,
    error: null as string | null | undefined,
    searchValue: '',
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSkipValue: (state, action) => {
      state.data.skip = action.payload;
    },
    setLimitValue: (state, action) => {
      state.data.limit = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.data.skip =
        action.payload <= 1 ? 0 : (action.payload - 1) * state.data.limit;
    },
    setProducts: (state, action) => {
      state.data.products = action.payload;
      state.data.total -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalPages = Math.ceil(state.data.total / state.data.limit);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOneProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(updateOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const {
  setSearchValue,
  setSkipValue,
  setLimitValue,
  setCurrentPage,
  setProducts,
} = productSlice.actions;
export { fetchProducts, fetchOneProduct, deleteOneProduct, updateOneProduct };
