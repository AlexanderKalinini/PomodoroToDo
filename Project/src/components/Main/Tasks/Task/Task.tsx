import Image from "next/image";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  decrementTomato,
  editTask,
  incrementTomato,
} from "../../../../../Store/Redux-Store/tasksSlice";
import { Menu } from "./Menu";
import styles from "./task.module.css";

interface ITask {
  text: string;
  key: string;
  numTomatoes: number;
  index: number;
}

const openCloseState: boolean[] = [];

export function Task({ text, numTomatoes, index }: ITask) {
  const [edited, setEdit] = useState(false);
  const [value, setValue] = useState(text);
  const [openMenu, setOpenMenu] = useState(
    openCloseState[index] ? openCloseState[index] : false
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);
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
        setOpenMenu(false);
        openCloseState.length = 0;
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
        openCloseState[index] = openMenu;
        dispatch(incrementTomato(index));

        break;
      case "decrement":
        openCloseState[index] = openMenu;
        dispatch(decrementTomato(index));
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
        <span className={styles.numTomatoes}>{numTomatoes}</span>
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
      {openMenu && <Menu numTomatoes={numTomatoes} index={index} />}
    </li>
  );
}
