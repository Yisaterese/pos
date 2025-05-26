import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import customersReducer from "./slices/customersSlice";
import salesReducer from "./slices/salesSlice";
import cartReducer from "./slices/cartSlice";
import inventoryReducer from "./slices/inventorySlice";
import employeesReducer from "./slices/employeesSlice";
import settingsReducer from "./slices/settingsSlice";
import offlineReducer from "./slices/offlineSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    customers: customersReducer,
    sales: salesReducer,
    cart: cartReducer,
    inventory: inventoryReducer,
    employees: employeesReducer,
    settings: settingsReducer,
    offline: offlineReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;