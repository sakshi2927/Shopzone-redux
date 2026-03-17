import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 10000,
  search: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setCategory, setPriceRange, setSearch, clearFilters } = filterSlice.actions;
export const selectFilters = (state) => state.filters;

export default filterSlice.reducer;
