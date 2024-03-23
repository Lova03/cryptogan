import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchCryptos = createAsyncThunk('crypto/fetchCryptos', async () => {
  try {
    const response = await fetch(`http://localhost:4001/api/crypto`);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request to API failed!');
  } catch (err) {
    return 'failed';
  }
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    list: [],
    hasError: false,
    isLoading: false,
    searchTerm: '',
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload.toLowerCase();
    },
  },
  extraReducers: {
    [fetchCryptos.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCryptos.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
      state.hasError = false;
      if (action.payload === 'failed') state.hasError = true;
    },
    [fetchCryptos.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectCryptos = (state) => state.crypto.list;
export const selectHasError = (state) => state.crypto.hasError;
export const selectIsLoading = (state) => state.crypto.isLoading;
export const selectSearchTerm = (state) => state.crypto.searchTerm;
export const selectFilteredCryptos = (state) => {
  return state.crypto.list.filter(
    (crypto) =>
      crypto?.name?.toLowerCase().includes(state.crypto.searchTerm) ||
      crypto?.symbol?.toLowerCase().includes(state.crypto.searchTerm) ||
      crypto?.id?.toLowerCase().includes(state.crypto.searchTerm)
  );
};

export const { changeSearchTerm } = cryptoSlice.actions;

export default cryptoSlice.reducer;
