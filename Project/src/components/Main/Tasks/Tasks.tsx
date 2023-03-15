import React, {
  FormEvent,
  ReactNode,
  TextareaHTMLAttributes,
  useState,
} from "react";
import styles from "./tasks.module.css";

import { useRef } from "react";
import { generateKey } from "crypto";
import { generateRandomeString } from "../../../../utils/react/generateRandomeString";
import { Task } from "./Task/Task";
export function Tasks() {
  const [tasks, setTask] = useState<ReactNode[]>([]);
  const [value, setValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleClick(event: FormEvent) {
    event.preventDefault();
    if (!value) return;
    setTask((prev) => [
      ...prev,
      <Task numTomatos={1} key={generateRandomeString()} text={value} />,
    ]);
    setValue("");
  }

  return (
    <div className={styles.tasks}>
      <h1 className={styles.title}>Ура! Теперь можно начать работать:</h1>
      <div className={styles.text}>
        <p>
          <span className={styles.point}>•</span> Выберите категорию и напишите
          название текущей задачи
        </p>
        <p>
          <span className={styles.point}>•</span>Запустите таймер («помидор»)
        </p>
        <p>
          <span className={styles.point}>•</span> Работайте пока «помидор» не
          прозвонит
        </p>
        <p>
          <span className={styles.point}>•</span>Сделайте короткий перерыв (3-5
          минут)
        </p>
        <p>
          {" "}
          <span className={styles.point}>•</span>
          Продолжайте работать «помидор» за «помидором», пока задачи не будут
          выполнены. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </p>
      </div>
      <form action="">
        <textarea
          onChange={handleChange}
          value={value}
          className={styles.textareaTask}
          placeholder="Название задачи"
        />
        <button className={styles.submitButton} onClick={handleClick}>
          Добавить
        </button>
      </form>
      <ul>{tasks}</ul>
    </div>
  );
}
