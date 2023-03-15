import React from "react";
import styles from "./task.module.css";
import Image from "next/image";

interface ITask {
  text: string;
  key: string;
  numTomatos?: number;
}

export function Task({ text, key, numTomatos }: ITask) {
  return (
    <li key={key} className={styles.list}>
      <div>
        <span className={styles.numTomatos}>{numTomatos}</span>
        <span>{text}</span>
      </div>

      <button className={styles.btn}>
        <Image src="/menuButton.svg" alt="button" width={26} height={6} />
      </button>
    </li>
  );
}
