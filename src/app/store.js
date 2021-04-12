import { createStore } from "redux";
// import counterReducer from '../features/counter/counterSlice';
import operationsReducer from "../features/counter/operations";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

const store = createStore(operationsReducer);

export default store;
