import { configureStore, ThunkAction, Action, MiddlewareArray } from "@reduxjs/toolkit";
import logger from "redux-logger";
import languageReducer from "./language";
import questionReducer from "./question";

const middleware = new MiddlewareArray();
if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    language: languageReducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
