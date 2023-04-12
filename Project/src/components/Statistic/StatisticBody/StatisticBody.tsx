import Image from "next/image";
import { getTimeHMS } from "../../../../utils/ts/getHoursMinutes";
import { TStat } from "../Statistic";
import { Schedule } from "./Schedule";
import styles from "./statisticbody.module.css";

interface ISBody {
  date: string;
  week: TStat[];
  pauseTime: number;
  focusTime: number;
  index: number;
  tomatoes: number;
  maxTime: number;
  setIndex: (a: number) => void;
}

export function StatisticBody({
  index,
  date,
  week,
  pauseTime,
  focusTime,
  tomatoes,
  maxTime,
  setIndex,
}: ISBody) {
  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  return (
    <div className={styles.body}>
      <div className={styles.day}>
        <span className={styles.dayOfWeek}>{daysOfWeek[index]}</span>
        <p className={styles.dayMessage}>
          {date ? (
            <span>
              {" "}
              Вы работали над задачами{" "}
              <span style={{ color: "#DC3E22" }}>
                {getTimeHMS(pauseTime + focusTime)}
              </span>{" "}
            </span>
          ) : (
            "Нет данных"
          )}
        </p>
      </div>
      {tomatoes ? (
        <div className={styles.numTomatoes}>
          <div className={styles.tomatoes}>
            <Image
              src="/tomato 1.svg"
              alt="image tomato"
              width={81}
              height={81}
              style={{ marginRight: 17 }}
            />
            <span>x {tomatoes}</span>
          </div>
          <span className={styles.tomText}>{tomatoes} помидора</span>
        </div>
      ) : (
        <div className={styles.numTomatoes}>
          <Image
            src="/smileTomato.svg"
            alt="image tomato"
            width={115}
            height={115}
          />
        </div>
      )}
      <Schedule
        {...{ maxTime: maxTime, setIndex: setIndex, week: week, index: index }}
      />
    </div>
  );
}
