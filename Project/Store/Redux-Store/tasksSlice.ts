import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITasks {
  tasks: { task: string; numTomatos: number; openCloseTaskMenu?: boolean }[];
}

const initialState: ITasks = {
  tasks: [{ task: "", numTomatos: 0 }],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        task: string;
        numTomatos: number;
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

    incrementTomat: (state, index: PayloadAction<number>) => {
      state.tasks[index.payload].numTomatos += 1;
    },

    decrementTomat: (state, index: PayloadAction<number>) => {
      if (state.tasks[index.payload].numTomatos <= 0) return;
      state.tasks[index.payload].numTomatos -= 1;
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
  incrementTomat,
  decrementTomat,
  editTask,
  openTaskMenu,
} = tasksSlice.actions;
export default tasksSlice.reducer;
