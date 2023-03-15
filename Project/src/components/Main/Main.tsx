import React from "react";
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