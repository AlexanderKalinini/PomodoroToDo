import { configureStore } from "@reduxjs/toolkit";

import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStore/localStorage";
import statSlice from "./statSlice";
import tasksSlice from "./tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    statistic: statSlice,
  },
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
