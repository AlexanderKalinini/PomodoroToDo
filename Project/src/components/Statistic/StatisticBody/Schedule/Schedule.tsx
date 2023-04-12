import classNames from "classnames";
import { getTimeHMS } from "../../../../../utils/ts/getHoursMinutes";
import { TStat } from "../../Statistic";
import styles from "./schedule.module.css";

interface ISchedule {
  maxTime: number;
  index: number;
  week: TStat[];
  setIndex: (a: number) => void;
}

export function Schedule({ maxTime, index, week, setIndex }: ISchedule) {
  const heightColumn = (totalTime: number) => {
    if (!totalTime) return "5px";
    const percent = (totalTime / maxTime) * 80;
    return `${percent > 159 ? 100 : percent}%`;
  };
  const columnStyle = (weekOfDay: number) =>
    classNames(styles.column, {
      [styles.columnRose]: week[weekOfDay]?.focusTime,
      [styles.columnRed]: weekOfDay === index && week[weekOfDay],
    });

  const dayOfWeekStyle = (weekOfDay: number) =>
    classNames({ [styles.colorRed]: weekOfDay === index });
  return (
    <div className={styles.schedule}>
      <div className={styles.scheduleLayout}>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <span style={{ width: 57 }}>{getTimeHMS(maxTime)}</span>
        </div>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <span style={{ width: 57 }}>{getTimeHMS(maxTime * 0.75)}</span>
        </div>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <span style={{ width: 57 }}>{getTimeHMS(maxTime * 0.5)}</span>
        </div>
        <div className={styles.lines}>
          <div className={styles.line}></div>
          <span style={{ width: 57 }}>{getTimeHMS(maxTime * 0.25)}</span>
        </div>
        <div
          onClick={() => setIndex(0)}
          style={{
            height: heightColumn(week[0]?.focusTime + week[0]?.pauseTime),
            left: "6.5%",
          }}
          className={columnStyle(0)}
        ></div>
        <div
          onClick={() => setIndex(1)}
          style={{
            height: heightColumn(week[1]?.focusTime + week[1]?.pauseTime),
            left: "18%",
          }}
          className={columnStyle(1)}
        ></div>
        <div
          onClick={() => setIndex(2)}
          style={{
            height: heightColumn(week[2]?.focusTime + week[2]?.pauseTime),
            left: "29%",
          }}
          className={columnStyle(2)}
        ></div>
        <div
          onClick={() => setIndex(3)}
          style={{
            height: heightColumn(week[3]?.focusTime + week[3]?.pauseTime),
            left: "41%",
          }}
          className={columnStyle(3)}
        ></div>
        <div
          onClick={() => setIndex(4)}
          style={{
            height: heightColumn(week[4]?.focusTime + week[4]?.pauseTime),
            left: "52%",
          }}
          className={columnStyle(4)}
        ></div>
        <div
          onClick={() => setIndex(5)}
          style={{
            height: heightColumn(week[5]?.focusTime + week[5]?.pauseTime),
            left: "64%",
          }}
          className={columnStyle(5)}
        ></div>
        <div
          onClick={() => setIndex(6)}
          style={{
            height: heightColumn(week[6]?.focusTime + week[6]?.pauseTime),
            left: "76%",
          }}
          className={columnStyle(6)}
        ></div>
      </div>
      <div className={styles.daysOfWeek}>
        <button
          className={dayOfWeekStyle(0)}
          onClick={() => setIndex(0)}
          id="Mon"
        >
          ПН
        </button>
        <button
          className={dayOfWeekStyle(1)}
          onClick={() => setIndex(1)}
          id="Tue"
        >
          ВТ{" "}
        </button>
        <button
          autoFocus={true}
          className={dayOfWeekStyle(2)}
          onClick={() => setIndex(2)}
          id="Wed"
        >
          СР{" "}
        </button>
        <button
          className={dayOfWeekStyle(3)}
          onClick={() => setIndex(3)}
          id="Thu"
        >
          ЧТ
        </button>
        <button
          className={dayOfWeekStyle(4)}
          onClick={() => setIndex(4)}
          id="Fri"
        >
          ПТ
        </button>
        <button
          className={dayOfWeekStyle(5)}
          onClick={() => setIndex(5)}
          id="Sat"
        >
          СБ
        </button>
        <button
          className={dayOfWeekStyle(6)}
          onClick={() => setIndex(6)}
          id="Sun"
        >
          ВС
        </button>
      </div>
    </div>
  );
}
