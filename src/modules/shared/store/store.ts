import { configureStore } from "@reduxjs/toolkit";
import { emptySavingApi } from "./emptySavingApi";

export const store = configureStore({
  reducer: {
    [emptySavingApi.reducerPath]: emptySavingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [emptySavingApi.util.resetApiState.type],
      },
    }).concat(emptySavingApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
