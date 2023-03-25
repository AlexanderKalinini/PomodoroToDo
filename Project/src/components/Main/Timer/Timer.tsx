import React, { useEffect, useState } from "react";
import styles from "./timer.module.css";
import Image from "next/image";

import { useGetTasksAfterRender } from "../../../../hooks/useGetTasks";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  decrementTomat,
  deleteTask,
} from "../../../../Store/Redux-Store/tasksSlice";

export function Timer() {
  const [tasks]: { task: string; numTomatos: number }[][] =
    useGetTasksAfterRender();
  const [seconds, setSeconds] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [paused, setPause] = useState(false);
  const [numTomat, setNumTomat] = useState(1);
  const [doneTomat, setDoneTomat] = useState(0);
  const [rest, setRest] = useState(false);
  const [numTask, setNumTask] = useState(1);
  const dispatch = useDispatch();
  console.log(rest);

  useEffect(() => {
    if (!tasks[0]) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setDoneTomat(0);
      setNumTomat(1);
      setRest(false);
      setSeconds(3);
      setNumTask(1);
      return;
    }

    if (numTomat > tasks[0]?.numTomatos + doneTomat) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      dispatch(deleteTask(0));
      setNumTomat(1);
      setSeconds(3);
      setDoneTomat(0);
      setRest(false);
      setNumTask((prev) => prev + 1);
    }

    if (seconds === 0) {
      if (!rest) {
        setSeconds(5);
        setRest(true);
        return;
      }

      if (rest) {
        clearInterval(intervalId);
        setIntervalId(undefined);
        setNumTomat((prev) => prev + 1);
        setSeconds(3);
        dispatch(decrementTomat(0));
        setDoneTomat((prev) => prev + 1);
        setRest(false);
      }
    }
  }, [seconds, numTomat, tasks, dispatch, doneTomat, intervalId, rest]);

  function timer() {
    setSeconds((prev) => prev - 1);
  }

  function handleClickStart() {
    if (intervalId || !tasks[0]) return;
    setIntervalId(setInterval(timer, 1000));
  }

  function handleClickStop() {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setSeconds(3);
    setPause(false);
    setRest(false);
  }

  function handleClickPause() {
    clearInterval(intervalId);
    setIntervalId(setInterval(() => {}));
    setPause(true);
  }

  function handleClickContinue() {
    setIntervalId(setInterval(timer, 1000));
    setPause(false);
  }

  function handleClickDone() {
    setIntervalId(undefined);
    setSeconds(3);
    setPause(false);
    dispatch(decrementTomat(0));
    setDoneTomat((prev) => prev + 1);
    setNumTomat((prev) => prev + 1);
  }

  function handleClickSkip() {
    setRest(true);
    setSeconds(0);
    setPause(false);
  }

  const timerHead = classNames(styles.timerHead, {
    [styles.backgroundColorRed]: Boolean(intervalId),
  });

  const dashboard = classNames(styles.dashboard, {
    [styles.colorBorderRed]: Boolean(intervalId),
  });

  const btnStop = classNames(styles.btnStop, {
    [styles.btnStopRed]: Boolean(intervalId),
  });

  return (
    <div className={styles.timer}>
      <div className={timerHead}>
        <span className={styles.timerHead_span}>{tasks && tasks[0]?.task}</span>
        <span>Помидор {numTomat}</span>
      </div>
      <div className={dashboard}>
        <div className={styles.timeBlock}>
          <span className={styles.time}>
            {Math.floor(seconds / 60)}:
            {seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60}
          </span>
          <button onClick={() => setSeconds((prev) => prev + 60)}>
            <svg
              className={styles.plusBtn}
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
              <path
                d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
                fill="white"
              />
            </svg>
          </button>{" "}
        </div>
        <div style={{ marginBottom: "32px" }}>
          {" "}
          <span style={{ color: "#999" }}>
            {tasks[0]
              ? "Задача " + numTask + " " + tasks[0]?.task
              : "Нет задач"}
          </span>{" "}
        </div>
        <div>
          {!Boolean(intervalId) ? (
            <button onClick={handleClickStart} className={styles.btnStart}>
              Старт
            </button>
          ) : !paused ? (
            <button onClick={handleClickPause} className={styles.btnStart}>
              Пауза
            </button>
          ) : (
            <button onClick={handleClickContinue} className={styles.btnStart}>
              Продолжить
            </button>
          )}
          {!paused ? (
            rest ? (
              <button onClick={handleClickSkip} className={btnStop}>
                Пропустить
              </button>
            ) : (
              <button onClick={handleClickStop} className={btnStop}>
                Стоп
              </button>
            )
          ) : (
            <button onClick={handleClickDone} className={btnStop}>
              Сделано
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
