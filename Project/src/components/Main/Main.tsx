import { useStartAppStatistic } from "../../../hooks/useStartAppStatistic";
import styles from "./main.module.css";
import { Tasks } from "./Tasks";
import { Timer } from "./Timer";

export function Main() {
  useStartAppStatistic();

  return (
    <main className={styles.main}>
      <Tasks />
      <Timer />
    </main>
  );
}
