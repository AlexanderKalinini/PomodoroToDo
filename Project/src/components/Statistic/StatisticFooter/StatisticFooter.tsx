import { getTimeHMS } from "../../../../utils/ts/getHoursMinutes";
import { TStat } from "../Statistic";
import styles from "./statisticfooter.module.css";

interface IStatisticFooter {
  date: string;
  week: TStat[];

  pauseTime: number;
  stops: number;
  focusTime: number;
  index: number;
}

export function StatisticFooter({ props }: { props: IStatisticFooter }) {
  const { week, pauseTime, stops, focusTime, index, date } = props;

  return (
    <div className={styles.footer}>
      <div
        className={`${styles.footerStatistic}  ${
          week[index] ? styles.background1 : styles.background11
        }`}
      >
        <span>Фокус</span>
        <span className={styles.time}>
          {date && focusTime
            ? `${Math.round((focusTime / (focusTime + pauseTime)) * 100)}%`
            : "0%"}
        </span>
      </div>
      <div
        className={`${styles.footerStatistic}  ${
          week[index] ? styles.background2 : styles.background22
        }`}
      >
        <span>Время на паузе</span>
        <span className={styles.time}>{getTimeHMS(pauseTime) || "0 с"}</span>
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
  );
}
