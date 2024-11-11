import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiUrl = import.meta.env.VITE_APP_BACKEND_API;


export const fetchBasket = createAsyncThunk(
  'basket/fetchBasket',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/basket/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addItem = createAsyncThunk(
  'basket/addItem',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/basket/${userId}/add`, { productId, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  'basket/updateQuantity',
  async ({ userId, itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${apiUrl}/basket/${userId}/item/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeItem = createAsyncThunk(
  'basket/removeItem',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${apiUrl}/basket/${userId}/item/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBasket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload.item_id);
        if (itemIndex >= 0) {
          state.items[itemIndex].quantity = action.payload.quantity;
        }
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.item_id);
      });
  },
});

export default basketSlice.reducer;
