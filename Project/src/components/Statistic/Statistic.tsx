import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStat, removeDate } from "../../../Store/Redux-Store/statSlice";
import { RootState } from "../../../Store/Redux-Store/store";
import { Select } from "../../../utils/react/Select";
import { getTimeHMS } from "../../../utils/ts/getHoursMinutes";
import { getWeekStat } from "../../../utils/ts/getWeekStat";
import { StatisticFooter } from "./StatisticFooter";
import styles from "./statistic.module.css";

export type TStat = {
  date: string;
  tomatoes: number;
  pauseTime: number;
  stops: number;
  focusTime: number;
};

export function Statistic() {
  const dayOfWeek = new Date().getDay() ? new Date().getDay() - 1 : 6;
  const { stat } = useSelector<RootState, IStat>((state) => state.statistic);
  const [week, setWeek] = useState<TStat[]>([]);
  const [index, setIndex] = useState(dayOfWeek);
  const dispatch = useDispatch();
  const [maxTime, setMaxTime] = useState(0);
  console.log();

  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const { date, tomatoes, pauseTime, stops, focusTime } = week[index]
    ? week[index]
    : {
        date: "",
        tomatoes: 0,
        pauseTime: 0,
        stops: 0,
        focusTime: 0,
      };

  useEffect(() => {
    setWeek(getWeekStat(0, stat));
    dispatch(removeDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMaxTime(getMaxTime(week));
    setIndex(dayOfWeek);
  }, [dayOfWeek, week]);

  function handleClickWeek(event: React.SyntheticEvent) {
    if ((event.target as HTMLElement).innerHTML === "Эта неделя") {
      setWeek(getWeekStat(0, stat));
    }
    if ((event.target as HTMLElement).innerHTML === "Прошлая неделя") {
      setWeek(getWeekStat(1, stat));
    }
    if ((event.target as HTMLElement).innerHTML === "2 недели назад") {
      setWeek(getWeekStat(2, stat));
    }
  }
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

  function getMaxTime(week: TStat[]) {
    return Math.max(
      ...week.filter((el) => el).map((el) => el.pauseTime + el.focusTime)
    );
  }

  return (
    <main className={styles.statistic}>
      <div onClick={handleClickWeek} className={styles.head}>
        <h1 className={styles.title}>Ваша активность</h1>
        <Select
          list={[
            { text: "Эта неделя" },
            { text: "Прошлая неделя" },
            { text: "2 недели назад" },
          ]}
        />
      </div>
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
      </div>
      <StatisticFooter
        props={{
          week: week,
          date: date,
          focusTime: focusTime,
          pauseTime: pauseTime,
          stops: stops,
          index: index,
        }}
      />
    </main>
  );
}
