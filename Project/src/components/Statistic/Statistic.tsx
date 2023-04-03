import React, { useEffect, useState } from "react";
import { Select } from "../../../utils/react/Select";
import Image from "next/image";
import styles from "./statistic.module.css";

import { useStartAppStatistic } from "../../../hooks/useStartAppStatistic";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../Store/Redux-Store/store";
import { IStat } from "../../../Store/Redux-Store/statSlice";
import { getHoursMinutes } from "../../../utils/ts/getHoursMinutes";
import classNames from "classnames";

type TStat = {
  date: string;
  tomatoes: number;
  pauseTime: number;
  totalTime: number;
  stops: number;
  focusTime: number;
};

export function Statistic() {
  useStartAppStatistic();
  const { stat } = useSelector<RootState, IStat>((state) => state.statistic);
  const [week, setWeek] = useState<TStat[]>([]);
  const [index, setIndex] = useState(0);

  const daysOfWeek = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  const { date, tomatoes, pauseTime, totalTime, stops, focusTime } = week[index]
    ? week[index]
    : {
        date: "",
        tomatoes: 0,
        pauseTime: 0,
        totalTime: 0,
        stops: 0,
        focusTime: 0,
      };

  const heightColumn = (totalTime: number | undefined) => {
    if (!totalTime) return "5px";
    const percent = (totalTime / 12300000) * 159;
    return `${percent > 100 ? 100 : percent}%`;
  };

  useEffect(() => {
    setWeek(getOneWeekStat(0));
  }, []);

  function getOneWeekStat(numWeek: number) {
    const currentWeekDates: string[] = [];
    const lastWeekDates: string[] = [];
    const twoWeeksAgoDates: string[] = [];
    const weekStat: TStat[] = [];
    const millisecondsInDay = 86400000;
    let numSun = 0;

    for (let daysAgo = 0; daysAgo < 21; daysAgo++) {
      console.log(numSun);
      const findDate = new Date(Date.now() - daysAgo * millisecondsInDay)
        .toString()
        .split(" ")
        .map((el, index) => {
          if (index < 4) {
            return el;
          }
        })
        .join(" ")
        .trim();
      if (findDate.split(" ")[0] === "Sun" && daysAgo) {
        numSun++;
      }

      if (numSun === 0) {
        currentWeekDates.unshift(findDate);
      }

      if (numSun === 1) {
        lastWeekDates.unshift(findDate);
      }
      if (numSun === 2) {
        twoWeeksAgoDates.unshift(findDate);
      }
    }

    if (numWeek === 0) {
      currentWeekDates.forEach((day, index) => {
        if (stat.find((obj) => obj.date === day)) {
          weekStat[index] = stat.find((obj) => obj.date === day) as TStat;
        }
      });
    }

    if (numWeek === -1) {
      lastWeekDates.forEach((day, index) => {
        if (stat.find((obj) => obj.date === day)) {
          weekStat[index] = stat.find((obj) => obj.date === day) as TStat;
        }
      });
    }

    if (numWeek === -2) {
      twoWeeksAgoDates.forEach((day, index) => {
        if (stat.find((obj) => obj.date === day)) {
          weekStat[index] = stat.find((obj) => obj.date === day) as TStat;
        }
      });
    }

    return weekStat;
  }

  function handleClickSelect(event: React.SyntheticEvent) {
    if ((event.target as HTMLElement).innerHTML === "Эта неделя") {
      setWeek(getOneWeekStat(0));
    }
    if ((event.target as HTMLElement).innerHTML === "Прошлая неделя") {
      setWeek(getOneWeekStat(-1));
      console.log("Прошлая неделя");
    }
    if ((event.target as HTMLElement).innerHTML === "2 недели назад") {
      setWeek(getOneWeekStat(-2));
      console.log("2 недели назад");
    }
  }

  const columnStyle = (weekOfDay: number) =>
    classNames(styles.column, {
      [styles.columnRose]: week[weekOfDay],
      [styles.columnRed]: weekOfDay === index && week[weekOfDay],
    });

  const dayOfWeekStyle = (weekOfDay: number) =>
    classNames({ [styles.colorRed]: weekOfDay === index });

  return (
    <main className={styles.statistic}>
      <div onClick={handleClickSelect} className={styles.head}>
        <h1 className={styles.title}>Ваша активность</h1>
        <Select
          options={[
            { value: "Эта неделя" },
            { value: "Прошлая неделя" },
            { value: "2 недели назад" },
          ]}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.day}>
          <span className={styles.dayOfWeek}>{daysOfWeek[index]}</span>
          <p className={styles.dayMessage}>
            {totalTime ? (
              <span>
                {" "}
                Вы работали над задачами{" "}
                <span style={{ color: "#DC3E22" }}>
                  {getHoursMinutes(totalTime)}
                </span>{" "}
              </span>
            ) : (
              "Нет данных"
            )}
          </p>
        </div>
        {tomatoes ? (
          <div className={styles.numTomatos}>
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
          <div className={styles.numTomatos}>
            <Image
              src="/smiletomato.svg"
              alt="image tomato"
              width={115}
              height={115}
            />
          </div>
        )}

        <div className={styles.schedule}>
          <div className={styles.sheduleLayout}>
            <div className={styles.lines}>
              <div className={styles.line}></div>
              <span style={{ width: 57 }}>1 ч 40 мин</span>
            </div>
            <div className={styles.lines}>
              <div className={styles.line}></div>
              <span style={{ width: 57 }}>1 ч 10 мин</span>
            </div>
            <div className={styles.lines}>
              <div className={styles.line}></div>
              <span style={{ width: 57 }}>50 мин</span>
            </div>
            <div className={styles.lines}>
              <div className={styles.line}></div>
              <span style={{ width: 57 }}>25 мин</span>
            </div>
            <div
              onClick={() => setIndex(0)}
              style={{ height: heightColumn(week[0]?.totalTime), left: "6.5%" }}
              className={columnStyle(0)}
            ></div>
            <div
              onClick={() => setIndex(1)}
              style={{ height: heightColumn(week[1]?.totalTime), left: "18%" }}
              className={columnStyle(1)}
            ></div>
            <div
              onClick={() => setIndex(2)}
              style={{ height: heightColumn(week[2]?.totalTime), left: "29%" }}
              className={columnStyle(2)}
            ></div>
            <div
              onClick={() => setIndex(3)}
              style={{ height: heightColumn(week[3]?.totalTime), left: "41%" }}
              className={columnStyle(3)}
            ></div>
            <div
              onClick={() => setIndex(4)}
              style={{ height: heightColumn(week[4]?.totalTime), left: "52%" }}
              className={columnStyle(4)}
            ></div>
            <div
              onClick={() => setIndex(5)}
              style={{ height: heightColumn(week[5]?.totalTime), left: "64%" }}
              className={columnStyle(5)}
            ></div>
            <div
              onClick={() => setIndex(6)}
              style={{ height: heightColumn(week[6]?.totalTime), left: "76%" }}
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
      <div className={styles.footer}>
        <div
          className={`${styles.footerStatistic}  ${
            week[index] ? styles.background1 : styles.background11
          }`}
        >
          <span>Фокус</span>
          <span className={styles.time}>
            {date ? `${Math.round((focusTime / totalTime) * 100)}%` : "0%"}
          </span>
        </div>
        <div
          className={`${styles.footerStatistic}  ${
            week[index] ? styles.background2 : styles.background22
          }`}
        >
          <span>Время на паузе</span>
          <span className={styles.time}>{getHoursMinutes(pauseTime)}</span>
        </div>
        <div
          className={`${styles.footerStatistic}  ${
            week[index] ? styles.background3 : styles.background33
          }`}
        >
          <span>Остановки</span>
          <span className={styles.time}>{stops}</span>
        </div>
      </div>
    </main>
  );
}
