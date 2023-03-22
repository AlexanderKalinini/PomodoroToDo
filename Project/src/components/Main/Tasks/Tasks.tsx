import React, { FormEvent, useState } from "react";
import styles from "./tasks.module.css";

import { addTask } from "../../../../Store/Redux-Store/tasksSlice";
import { useDispatch } from "react-redux";

import { generateRandomeString } from "../../../../utils/react/generateRandomeString";
import { Task } from "./Task/Task";
import { useGetTasksAfterRender } from "../../../../hooks/useGetTasks";

export function Tasks() {
  const [tasks] = useGetTasksAfterRender();

  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  let minutes = 0;
  let hours = 0;

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleClick(event: FormEvent) {
    event.preventDefault();
    if (!value) return;
    dispatch(addTask({ task: value, numTomatos: 1, openMenu: false }));
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

      <ul className={styles.tasks}>
        {" "}
        {tasks.map((obj: any, index: number) => {
          minutes += obj.numTomatos * 25;
          hours = Math.floor(minutes / 60);
          return (
            <Task
              index={index}
              numTomatos={obj.numTomatos}
              key={generateRandomeString()}
              text={obj.task}
            />
          );
        })}
      </ul>
      {minutes !== 0 && (
        <span className={styles.time}>
          {hours > 0
            ? hours +
              (hours === 1
                ? " час"
                : 1 < hours && hours < 5
                ? " часа "
                : " часов ")
            : null}{" "}
          {minutes % 60} минут
        </span>
      )}
    </div>
  );
}
