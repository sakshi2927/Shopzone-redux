import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const normalizedItem = {
        id: action.payload.id,
        name: action.payload.title ?? action.payload.name,
        price: action.payload.price,
        category: action.payload.category,
        image: action.payload.thumbnail ?? action.payload.image,
      };

      const existing = state.items.find((item) => item.id === normalizedItem.id);

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({ ...normalizedItem, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => {
  return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default cartSlice.reducer;
