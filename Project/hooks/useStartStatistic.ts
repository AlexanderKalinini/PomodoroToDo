import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDate } from "../Store/Redux-Store/statSlice";

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
    dispatch(addDate(date));
  }, [date, dispatch]);
}
