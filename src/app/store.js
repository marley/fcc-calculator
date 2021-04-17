// import { configureStore } from "@reduxjs/toolkit";
// import operationsReducer from "../features/calculator/operations";

// export const store = configureStore({
//   reducer: {
//     operations: operationsReducer,
//   },
// });
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/calculator/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
