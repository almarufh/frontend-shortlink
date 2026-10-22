import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const base_url = import.meta.env.VITE_HOST_ORIGIN;

const initialState = {
  token: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  message: null,
};

export const authRegister = createAsyncThunk(
  'auth/register',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${base_url}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
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

const authSlice = createSlice({
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
      .addCase(authRegister.pending, (state) => {
        state.isPending = true;
        state.isFulfilled = false;
        state.isRejected = false;
        state.message = null;
      })
      .addCase(authRegister.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = true;
        state.isRejected = false;
        state.message = payload?.message || 'Registrasi berhasil';
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        state.isPending = false;
        state.isFulfilled = false;
        state.isRejected = true;
        state.message = payload?.message || 'Registrasi gagal';
      });
  },
});

export const { resetHistory } = authSlice.actions;

export default authSlice.reducer;
