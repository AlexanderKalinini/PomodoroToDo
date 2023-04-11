import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/Redux-Store/store";
import { ITasks } from "../Store/Redux-Store/tasksSlice";

export function useGetTasksAfterRender() {
  const data = useSelector<RootState, ITasks>((state) => state.tasks);
  const [tasks, setTasks] = useState([{}]);
  useEffect(() => {
    setTasks(data.tasks);
  }, [data]);

  return [tasks] as {
    task: string;
    numTomatoes: number;
    openCloseTaskMenu?: boolean;
  }[][];
}
