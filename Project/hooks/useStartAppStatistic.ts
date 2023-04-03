import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { addDate, addTotalTime } from "../Store/Redux-Store/statSlice";

export function useStartAppStatistic() {
  const dispatch = useDispatch();

  const date: string = new Date()
    .toString()
    .split(" ")
    .map((el, index) => {
      if (index < 4) {
        return el;
      }
    })
    .join(" ")
    .trim();

  useEffect(() => {
    const startDate = Date.now();
    console.log("mount", startDate);
    const handleBeforeUnload = () => {
      dispatch(addTotalTime(Date.now() - startDate));
    };
    dispatch(addDate(date));
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      console.log("unmount", startDate);
      dispatch(addTotalTime(Date.now() - startDate));
    };
  }, [date, dispatch]);
}
