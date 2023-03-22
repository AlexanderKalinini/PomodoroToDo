import React, { useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ITasks } from "../../../../../../Store/Redux-Store/tasksSlice";
import { RootState } from "../../../../../../Store/Redux-Store/store";

import { DeleteTask } from "./DeleteTask";

export function Menu({
  index,
  numTomatos,
}: {
  index: number;
  numTomatos: number;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <div id="taskMenu" className={styles.menuButtons}>
      <button id="increment" className={styles.menuBtn}>
        <Image
          className={styles.buttonImg}
          src="/plus.svg"
          width={15}
          height={15}
          alt="plus"
        />{" "}
        Увеличить
      </button>
      <button id="decrement" className={styles.menuBtn}>
        {numTomatos > 1 ? (
          <Image
            className={styles.buttonImg}
            src="/minus_color.svg"
            width={15}
            height={15}
            alt="minus"
          />
        ) : (
          <Image
            className={styles.buttonImg}
            src="/minus.svg"
            width={15}
            height={15}
            alt="minus"
          />
        )}
        Уменьшить
      </button>
      <button id="edit" className={styles.menuBtn}>
        {" "}
        <Image
          className={styles.buttonImg}
          src="/pencil.svg"
          width={15}
          height={15}
          alt="pencil"
        />
        Редактировать
      </button>
      <button className={styles.menuBtn} onClick={handleClick}>
        {" "}
        <Image
          className={styles.buttonImg}
          src="/busket.svg"
          width={15}
          height={15}
          alt="busket"
        />
        Удалить
      </button>
      {isOpen && (
        <DeleteTask isOpen={isOpen} setIsOpen={setIsOpen} index={index} />
      )}
    </div>
  );
}
