import { ITasks } from "../Redux-Store/tasksSlice";

export function saveToLocalStorage(state: { tasks: ITasks }) {
  if (typeof window === "undefined") return;
  try {
    const json = JSON.stringify(state);
    localStorage.setItem("reduxStore", json);
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  if (typeof window === "undefined") return;
  try {
    const serialState = localStorage.getItem("reduxStore");
    if (serialState === null) return [];
    return JSON.parse(serialState);
  } catch (e) {
    console.log(e);
  }
}
