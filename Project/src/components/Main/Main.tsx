import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import store, { saveToLocalStorage } from "../../../Store/Redux-Store/store";
import { addTask } from "../../../Store/Redux-Store/tasksSlice";
import styles from "./main.module.css";
import { Tasks } from "./Tasks";
import { Timer } from "./Timer";

export function Main() {
  return (
    <main className={styles.main}>
      <Tasks />
      <Timer />
    </main>
  );
}
