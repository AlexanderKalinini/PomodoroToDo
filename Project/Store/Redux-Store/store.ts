import { Statistic } from "@/components/Statistic";
import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./tasksSlice";
import statSlice from "./statSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../LocalStore/localStorage";

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
