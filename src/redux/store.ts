import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import logger from "redux-logger";
import languageReducer from "./language";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
