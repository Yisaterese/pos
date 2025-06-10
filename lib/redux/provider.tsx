// lib/redux/provider.tsx
"use client";
import type React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
      <Provider store={store}>
        <PersistGate loading={<div className="flex justify-center items-center h-screen">Loading...</div>} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
  );
}