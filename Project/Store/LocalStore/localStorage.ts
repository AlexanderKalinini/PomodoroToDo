import { ITasks } from "../Redux-Store/tasksSlice";

export function saveToLocalStorage(state: { tasks: ITasks }) {
  try {
    const json = JSON.stringify(state);
    localStorage.setItem("reduxStore", json);
  } catch (e) {
    console.log(e);
  }
}

export function loadFromLocalStorage() {
  try {
    const serialState = localStorage.getItem("reduxStore");
    if (serialState === null) return [];
    return JSON.parse(serialState);
  } catch (e) {
    console.log(e);
  }
}
