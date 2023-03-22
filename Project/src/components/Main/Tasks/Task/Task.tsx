import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import styles from "./task.module.css";
import Image from "next/image";
import { Menu } from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementTomat,
  editTask,
  incrementTomat,
  openTaskMenu,
} from "../../../../../Store/Redux-Store/tasksSlice";
import { RootState } from "../../../../../Store/Redux-Store/store";

interface ITask {
  text: string;
  key: string;
  numTomatos: number;
  index: number;
}

const arr: boolean[] = [];

export function Task({ text, numTomatos, index }: ITask) {
  const [edited, setEdit] = useState(false);
  const [value, setValue] = useState(text);
  const [openMenu, setOpenMenu] = useState(arr[index] ? arr[index] : false);
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);
  console.log(arr);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.select();
  }, [edited]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest("#taskMenu") &&
        !event.target.closest("#task-menu-btn") &&
        !event.target.closest("#dialog-root")
      ) {
        console.log("CloseMenu");

        setOpenMenu(false);
        arr.length = 0;
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  function handleClickEditTask(event: BaseSyntheticEvent) {
    switch (event.target.id) {
      case "edit":
        setEdit(!edited);
        dispatch(editTask({ task: value, index: index }));

        break;
      case "increment":
        setOpenMenu(true);
        arr[index] = openMenu;
        dispatch(incrementTomat(index));

        break;
      case "decrement":
        arr[index] = openMenu;
        dispatch(decrementTomat(index));
        break;
    }
  }

  function handleBlur() {
    dispatch(editTask({ task: value, index: index }));
    setEdit(!edited);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key !== "Enter") return;
    dispatch(editTask({ task: value, index: index }));
    setEdit(!edited);
  }

  return (
    <li onClick={handleClickEditTask} className={styles.list}>
      <div className={styles.taskName}>
        <span className={styles.numTomatos}>{numTomatos}</span>
        {!edited ? (
          <p className={styles.textTask}>{text}</p>
        ) : (
          <textarea
            className={styles.textaria}
            ref={ref}
            autoFocus
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            value={value}
            onChange={handleChange}
            rows={3}
          ></textarea>
        )}
      </div>
      <button
        id="task-menu-btn"
        className={styles.btn}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Image src="/menuButton.svg" alt="button" width={26} height={6} />
      </button>
      {openMenu && <Menu numTomatos={numTomatos} index={index} />}
    </li>
  );
}
