import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITasks {
  tasks: { task: string; numTomatoes: number; openCloseTaskMenu?: boolean }[];
}

const initialState: ITasks = {
  tasks: [{ task: "", numTomatoes: 0 }],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        task: string;
        numTomatoes: number;
        openMenu?: boolean;
      }>
    ) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },
    deleteTask: (state, index: PayloadAction<number>) => {
      state.tasks.splice(index.payload, 1);
    },

    editTask: (
      state,
      action: PayloadAction<{ task: string; index: number }>
    ) => {
      state.tasks[action.payload.index].task = action.payload.task;
    },

    incrementTomato: (state, index: PayloadAction<number>) => {
      state.tasks[index.payload].numTomatoes += 1;
    },

    decrementTomato: (state, index: PayloadAction<number>) => {
      if (state.tasks[index.payload].numTomatoes <= 0) return;
      state.tasks[index.payload].numTomatoes -= 1;
    },
    openTaskMenu(
      state,
      action: PayloadAction<{ index: number; openTask?: boolean }>
    ) {
      if (action.payload.openTask === undefined) return;

      state.tasks[action.payload.index].openCloseTaskMenu =
        action.payload.openTask;
    },
  },
});

export const {
  addTask,
  deleteTask,
  incrementTomato: incrementTomato,
  decrementTomato: decrementTomato,
  editTask,
  openTaskMenu,
} = tasksSlice.actions;
export default tasksSlice.reducer;
