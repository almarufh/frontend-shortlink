import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const base_url = import.meta.env.VITE_HOST_ORIGIN;

const initialState = {
  links: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  message: null,
};

export const createShortURL = createAsyncThunk(
  'createShortURL',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth?.token;

      const response = await fetch(`${base_url}/api/links`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.message || 'Terjadi kesalahan jaringan',
        data: null,
      });
    }
  }
);

export const getMyLinks = createAsyncThunk(
  'getMyLinks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await fetch(`${base_url}/api/links`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.message || 'Terjadi kesalahan jaringan',
        data: null,
      });
    }
  }
);

export const delLinks = createAsyncThunk(
  'getMyLinks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth?.token;
      const response = await fetch(`${base_url}/api/links/${payload}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.message || 'Terjadi kesalahan jaringan',
        data: null,
      });
    }
  }
);

const linksSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetHistory: (state) => {
      state.isPending = false;
      state.isFulfilled = false;
      state.isRejected = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyLinks.pending, (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.message = null;
      })
      .addCase(getMyLinks.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.isRejected = false;
        state.links = payload?.data;
        state.message = payload?.message;
      })
      .addCase(getMyLinks.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.message = payload?.message;
      })
      .addCase(createShortURL.pending, (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.message = null;
      })
      .addCase(createShortURL.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.isRejected = false;
        state.message = payload?.message;
      })
      .addCase(createShortURL.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.message = payload?.message;
      });
  },
});

export const { resetHistory } = linksSlice.actions;

export default linksSlice.reducer;
