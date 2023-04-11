import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IStat {
  stat: {
    date: string;
    tomatoes: number;
    pauseTime: number;
    stops: number;
    focusTime: number;
  }[];
}

const initialState: IStat = {
  stat: [],
};

const statSlice = createSlice({
  name: "statistic",
  initialState: initialState,
  reducers: {
    addDate(state, action: PayloadAction<string>) {
      if (
        state.stat.length &&
        state.stat[state.stat.length - 1].date === action.payload
      )
        return;
      state.stat.push({
        date: action.payload,
        tomatoes: 0,
        pauseTime: 0,
        stops: 0,
        focusTime: 0,
      });
    },
    removeDate(state) {
      if (state.stat.length > 21) {
        state.stat.shift();
      }
    },

    addTomatoes(state) {
      state.stat[state.stat.length - 1].tomatoes++;
    },
    addStops(state) {
      state.stat[state.stat.length - 1].stops++;
    },
    addPauseTime(state, milliseconds: PayloadAction<number>) {
      if (!milliseconds.payload) return;
      state.stat[state.stat.length - 1].pauseTime +=
        new Date().getTime() - milliseconds.payload;
    },
    addFocusTime(state, milliseconds: PayloadAction<number>) {
      if (!milliseconds.payload) return;
      state.stat[state.stat.length - 1].focusTime +=
        new Date().getTime() - milliseconds.payload;
    },
  },
});

export const {
  addDate,

  addTomatoes,
  addStops,
  addPauseTime,
  addFocusTime: addFocusTime,
  removeDate,
} = statSlice.actions;

export default statSlice.reducer;
