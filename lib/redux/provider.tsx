"use client";

import type React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

// Load state from localStorage
const loadState = () => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem("reduxState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    }
    return undefined;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    }
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load initial state from localStorage
    const persistedState = loadState();
    if (persistedState) {
      // If you need to initialize the store with this state, you can dispatch actions here
      // For now, we'll assume the state is managed by the reducers
    }

    // Subscribe to store changes to save state
    const unsubscribe = store.subscribe(() => {
      saveState(store.getState());
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}