import Link from "next/link";
import React from "react";
import Image from "next/image";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          className={styles.imgTomato}
          src="/favicon.ico"
          width={38}
          height={36}
          alt="tomato"
        />
        <span className={styles.logoText}>pomodoro_box</span>
      </Link>
      <Link className={styles.stat} href="/statistics">
        <Image
          className={styles.imgColumns}
          src="/statColumns.svg"
          width={16}
          height={16}
          alt="stat"
        />
        <span className={styles.wordStat}>Статистика</span>
      </Link>
    </header>
  );
}
