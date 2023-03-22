import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../../../../../Store/Redux-Store/tasksSlice";
import styles from "./deletetask.module.css";

export function DeleteTask({
  index,
  isOpen,
  setIsOpen,
}: {
  index: number;
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}) {
  const dispatch = useDispatch();
  const dialog = document.querySelector<HTMLElement>("#dialog-root");
  if (!dialog) return null;

  function handleClickDelete() {
    console.log("Delete");

    dispatch(deleteTask(index));
  }
  return ReactDOM.createPortal(
    <div id="dialog">
      <div className={styles.coverDiv}></div>
      <div className={styles.dialogWindow}>
        <span className={styles.askDelete}>Удалить задачу?</span>
        <button onClick={handleClickDelete} className={styles.deleteBtn}>
          Удалить
        </button>
        <button onClick={() => setIsOpen(false)} className={styles.cancelBtn}>
          Отмена
        </button>
      </div>
    </div>,
    dialog
  );
}
