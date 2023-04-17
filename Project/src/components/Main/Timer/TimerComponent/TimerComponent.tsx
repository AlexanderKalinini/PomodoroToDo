import classNames from "classnames";
import styles from "./timercomponent.module.css";

interface ITimer {
  intervalId: NodeJS.Timeout | undefined;
  rest: boolean;
  paused: boolean;
  tasks: { task: string; numTomatoes: number }[];
  numTomato: number;
  seconds: number;
  numTask: number;
  handleClickSkip: () => void;
  handleClickDone: () => void;
  handleClickStart: () => void;
  handleClickStop: () => void;
  handleClickPause: () => void;
  handleClickContinue: () => void;
  setSeconds: (a: (a: number) => number) => void;
}

export function TimerComponent({
  intervalId,
  rest,
  tasks,
  paused,
  numTomato,
  seconds,
  numTask,
  handleClickSkip,
  handleClickDone,
  handleClickStart,
  handleClickStop,
  handleClickPause,
  handleClickContinue,
  setSeconds,
}: ITimer) {
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
