import { configureStore } from "@reduxjs/toolkit";
import operationsReducer from "../features/counter/operations";

export const store = configureStore({
  reducer: {
    operator: operationsReducer,
  },
});
