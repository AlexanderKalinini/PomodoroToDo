import { useState } from "react";
import { GenericList, IGenericListProps } from "../GenericList";
import styles from "./select.module.css";

export function Select({ list }: IGenericListProps) {
  const [placeHolder, setPlaceHolder] = useState(list[0].text);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick: (text: string) => void = (text: string) => {
    setPlaceHolder(text);
    setIsOpen(!isOpen);
  };
  list = list.map((el) => ({
    ...el,
    className: styles.item,
    onClick: handleClick,
  }));

  const styleContainer = isOpen
    ? styles.container + " " + styles.opened
    : styles.container;

  return (
    <div className={styleContainer}>
      <div
        hidden={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={styles.placeholder}
      >
        {placeHolder}
      </div>
      <ul className={styles.list}>{isOpen && <GenericList list={list} />}</ul>
    </div>
  );
}
