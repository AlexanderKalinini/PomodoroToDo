import React from "react";
import { Select } from "../../../utils/react/Select";

import styles from "./statistic.module.css";

export function Statistic() {
  const options = [
    { value: "Эта неделя" },
    { value: "Прошлая неделя" },
    { value: "2 недели назад" },
  ];

  return (
    <main className={styles.statistic}>
      <div className={styles.head}>
        <h1 className={styles.title}>Ваша активность</h1>
        <Select options={options} />
      </div>
      <div className={styles.body}>
        <div className={styles.day}></div>
        <div className={styles.schedule}></div>
        <div className={styles.numTomatos}></div>
      </div>
    </main>
  );
}
