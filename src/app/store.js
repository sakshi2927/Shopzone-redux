import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import filtersReducer from '../features/filters/filterSlice';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';

const STORAGE_KEY = 'shopzone_state';

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const parsedState = JSON.parse(serializedState);

    return {
      cart: parsedState.cart,
      theme: parsedState.theme,
      auth: parsedState.auth,
    };
  } catch {
    return undefined;
  }
};

const savePersistedState = (state) => {
  try {
    const serializedState = JSON.stringify({
      cart: state.cart,
      theme: state.theme,
      auth: state.auth,
    });

    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch {
    // Ignore write errors (private mode/quota).
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    theme: themeReducer,
    auth: authReducer,
  },
  preloadedState: loadPersistedState(),
});

store.subscribe(() => {
  savePersistedState(store.getState());
});
