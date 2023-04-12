import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStat, removeDate } from "../../../Store/Redux-Store/statSlice";
import { RootState } from "../../../Store/Redux-Store/store";
import { Select } from "../../../utils/react/Select";
import { getWeekStat } from "../../../utils/ts/getWeekStat";
import { StatisticBody } from "./StatisticBody";
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

  const { date, pauseTime, stops, focusTime, tomatoes } = week[index]
    ? week[index]
    : {
        date: "",
        pauseTime: 0,
        stops: 0,
        focusTime: 0,
        tomatoes: 0,
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
      <StatisticBody
        {...{
          index: index,
          week: week,
          date: date,
          focusTime: focusTime,
          pauseTime: pauseTime,
          tomatoes: tomatoes,
          maxTime: maxTime,
          setIndex: setIndex,
        }}
      />
      <StatisticFooter
        {...{
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
