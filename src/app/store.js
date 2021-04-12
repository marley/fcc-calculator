import { configureStore } from "@reduxjs/toolkit";
import operationsReducer from "../features/calculator/operations";

export const store = configureStore({
  reducer: {
    operator: operationsReducer,
  },
});
