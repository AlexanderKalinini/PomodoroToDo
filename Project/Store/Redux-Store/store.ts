import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasksSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStore/localStorage";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
