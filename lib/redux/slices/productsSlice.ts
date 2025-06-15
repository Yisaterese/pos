import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {Product} from "@/types/types";



interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    updateStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.items.find((p) => p.id === id);
      if (product) {
        product.stock += quantity;
      }
    },
  },
});

export const { addProduct, updateProduct, deleteProduct, updateStock } = productsSlice.actions;
export default productsSlice.reducer;