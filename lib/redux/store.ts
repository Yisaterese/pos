
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productsReducer from "./slices/productsSlice";
import customersReducer from "./slices/customersSlice";
import salesReducer from "./slices/salesSlice";
import cartReducer from "./slices/cartSlice";
import inventoryReducer from "./slices/inventorySlice";
import employeesReducer from "./slices/employeesSlice";
import settingsReducer from "./slices/settingsSlice";
import offlineReducer from "./slices/offlineSlice";

// Use a fallback storage for SSR
const storageEngine = typeof window !== "undefined" ? storage : {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

const rootReducer = combineReducers({
  products: productsReducer,
  customers: customersReducer,
  sales: salesReducer,
  cart: cartReducer,
  inventory: inventoryReducer,
  employees: employeesReducer,
  settings: settingsReducer,
  offline: offlineReducer,
});

const persistConfig = {
  key: "root",
  storage: storageEngine,
  whitelist: ["cart", "offline", "settings"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store, null, () => {
  console.log("Redux-persist rehydration complete, cart:", store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState> extends infer S
  ? S extends { _persist: any }
    ? S & { [K in keyof S as K extends "_persist" ? never : K]: S[K] }
    : S
  : never;

export type AppDispatch = typeof store.dispatch;
