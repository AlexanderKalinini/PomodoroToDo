import React from "react";
import styles from "./timer.module.css";
import Image from "next/image";

export function Timer() {
  return (
    <div className={styles.timer}>
      <div className={styles.timerHead}>
        <span className={styles.timerHead_span}>Сверстать сайт</span>
        <span>Помидор 1</span>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.timeBlock}>
          <span className={styles.time}>25:00</span>
          <button>
            <Image src="/plusBtn.svg" alt="button" width={50} height={50} />{" "}
          </button>{" "}
        </div>
        <div style={{ marginBottom: "32px" }}>
          {" "}
          <span style={{ color: "#999" }}>Задача 1 -</span> Сверстать сайт{" "}
        </div>
        <div>
          <button className={styles.btn}>Старт</button>
          <button className={styles.btn}>Стоп</button>
        </div>
      </div>
    </div>
  );
}
