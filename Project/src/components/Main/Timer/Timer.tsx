import React, { useEffect, useState } from "react";
import styles from "./timer.module.css";
import { useGetTasksAfterRender } from "../../../../hooks/useGetTasks";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  decrementTomato,
  deleteTask,
} from "../../../../Store/Redux-Store/tasksSlice";
import {
  addFocusTime,
  addPauseTime,
  addStops,
  addTomatoes,
} from "../../../../Store/Redux-Store/statSlice";

export function Timer() {
  const [tasks]: { task: string; numTomatoes: number }[][] =
    useGetTasksAfterRender();
  const [seconds, setSeconds] = useState(3);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [paused, setPause] = useState(false);
  const [numTomato, setNumTomato] = useState(1);
  const [doneTomato, setDoneTomato] = useState(0);
  const [rest, setRest] = useState(false);
  const [numTask, setNumTask] = useState(1);
  const dispatch = useDispatch();
  const [pausedTime, setPauseTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);

  useEffect(() => {
    if (tasks.length === 0) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setDoneTomato(0);
      setNumTomato(1);
      setRest(false);
      setSeconds(3);
      setNumTask(1);
      return;
    }

    if (!tasks[0]) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setDoneTomato(0);
      setNumTomato(1);
      setRest(false);
      setSeconds(3);
      setNumTask(1);
      return;
    }

    if (numTomato > tasks[0]?.numTomatoes + doneTomato) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      dispatch(deleteTask(0));
      setNumTomato(1);
      setSeconds(3);
      setDoneTomato(0);
      setRest(false);
      setNumTask((prev) => prev + 1);
    }

    if (seconds === 0) {
      if (!rest) {
        setSeconds(5);
        setRest(true);
        dispatch(addFocusTime(focusTime));
        setFocusTime(0);
        return;
      }

      if (rest) {
        clearInterval(intervalId);
        setIntervalId(undefined);
        setNumTomato((prev) => prev + 1);
        setSeconds(3);
        dispatch(decrementTomato(0));
        dispatch(addTomatoes());
        setDoneTomato((prev) => prev + 1);
        setRest(false);
      }
    }
  }, [
    seconds,
    numTomato,
    tasks,
    dispatch,
    doneTomato,
    intervalId,
    rest,
    focusTime,
  ]);

  function timer() {
    setSeconds((prev) => prev - 1);
  }

  function handleClickStart() {
    if (intervalId || !tasks[0]) return;
    setIntervalId(setInterval(timer, 1000));
    setFocusTime(Date.now());
  }

  function handleClickStop() {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setSeconds(3);
    setPause(false);
    setRest(false);
    dispatch(addStops());
    dispatch(addFocusTime(focusTime));
    setFocusTime(0);
  }

  function handleClickPause() {
    clearInterval(intervalId);
    setIntervalId(setInterval(() => {}));
    setPause(true);
    dispatch(addStops());
    setPauseTime(Date.now());
    dispatch(addFocusTime(focusTime));
    setFocusTime(0);
  }

  function handleClickContinue() {
    setIntervalId(setInterval(timer, 1000));
    setPause(false);
    dispatch(addPauseTime(pausedTime));
    if (!rest) {
      setPauseTime(0);
      setFocusTime(Date.now());
    }
  }

  function handleClickDone() {
    setIntervalId(undefined);
    setSeconds(3);
    setPause(false);
    setRest(false);
    dispatch(decrementTomato(0));
    setDoneTomato((prev) => prev + 1);
    setNumTomato((prev) => prev + 1);
    dispatch(addTomatoes());
    dispatch(addPauseTime(pausedTime));
    setPauseTime(0);
  }

  function handleClickSkip() {
    setRest(true);
    setSeconds(0);
    setPause(false);
    dispatch(addPauseTime(pausedTime));
    setPauseTime(0);
  }

  const timerHead = classNames(styles.timerHead, {
    [styles.backgroundColorRed]: Boolean(intervalId),
    [styles.backgroundColorGreen]: rest,
  });

  const dashboard = classNames(styles.dashboard, {
    [styles.colorBorderRed]: Boolean(intervalId) && !paused,
    [styles.colorGreen]: rest && !paused,
  });

  const btnStop = classNames(styles.btnStop, {
    [styles.btnStopRed]: Boolean(intervalId),
  });

  const task = <span style={{ color: "#333" }}>{tasks[0]?.task}</span>;

  return (
    <div className={styles.timer}>
      <div className={timerHead}>
        <span className={styles.timerHead_span}>{tasks && tasks[0]?.task}</span>
        <span>Помидор {numTomato}</span>
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
          <span style={{ color: "#999" }}>
            {tasks[0] ? (
              <span>
                {"Задача " + numTask + " - "}
                {task}
              </span>
            ) : (
              "Нет задач"
            )}{" "}
          </span>
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
              <button
                disabled={!intervalId}
                onClick={handleClickStop}
                className={btnStop}
              >
                Стоп
              </button>
            )
          ) : rest ? (
            <button onClick={handleClickSkip} className={btnStop}>
              Пропустить
            </button>
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
