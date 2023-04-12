import Image from "next/image";
import { useState } from "react";
import styles from "./menu.module.css";
import { DeleteTask } from "./DeleteTask";

export function Menu({
  index,
  numTomatoes,
}: {
  index: number;
  numTomatoes: number;
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

      {numTomatoes > 1 ? (
        <button id="decrement" className={styles.menuBtn}>
          <Image
            className={styles.buttonImg}
            src="/minus_color.svg"
            width={15}
            height={15}
            alt="minus"
          />{" "}
          Уменьшить{" "}
        </button>
      ) : (
        <button disabled id="decrement" className={styles.menuBtn}>
          <Image
            className={styles.buttonImg}
            src="/minus.svg"
            width={15}
            height={15}
            alt="minus"
          />{" "}
          Уменьшить{" "}
        </button>
      )}

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
          src="/basket.svg"
          width={15}
          height={15}
          alt="basket"
        />
        Удалить
      </button>
      {isOpen && (
        <DeleteTask isOpen={isOpen} setIsOpen={setIsOpen} index={index} />
      )}
    </div>
  );
}
