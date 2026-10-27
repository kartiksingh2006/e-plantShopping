import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          // Keep `cost` available for the cart UI while retaining `price`
          // compatibility with the product list.
          cost: product.cost ?? product.price ?? 0,
          quantity: 1,
        });
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      } else {
        item.quantity = quantity;
      }
    },

    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },

    // Keep the existing actions for compatibility with other components.
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.id === action.payload);
      if (!item) return;

      if (item.quantity <= 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeItem,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
