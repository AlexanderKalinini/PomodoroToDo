import React, { useState } from "react";
import styles from "./select.module.css";

interface ISelect {
  options: { value: string }[];
}

export function Select({ options }: ISelect) {
  const [placeHolder, setPlaceHolder] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const generateRandomeString = () =>
    Math.random().toString(36).substring(2, 15);

  const handleClick = (value: string) => {
    setPlaceHolder(value);
    setIsOpen(!isOpen);
  };

  const optionsList = options.map((el: { value: string }) => (
    <li
      hidden={placeHolder === el.value}
      onClick={() => handleClick(el.value)}
      key={generateRandomeString()}
      className={styles.item}
    >
      {el.value}
    </li>
  ));

  const stylePlaceholder = isOpen
    ? styles.placeholder + " " + styles.opend
    : styles.placeholder;

  return (
    <div className={styles.container}>
      <div onClick={() => setIsOpen(!isOpen)} className={stylePlaceholder}>
        {placeHolder}
      </div>
      <ul className={styles.list}>{isOpen && optionsList}</ul>
    </div>
  );
}
