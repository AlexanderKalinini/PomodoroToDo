import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFocusTime,
  addPauseTime,
  addStops,
  addTomatoes,
} from "../../../../Store/Redux-Store/statSlice";
import {
  decrementTomato,
  deleteTask,
} from "../../../../Store/Redux-Store/tasksSlice";
import { useGetTasksAfterRender } from "../../../../hooks/useGetTasks";
import { TimerComponent } from "./TimerComponent";

export function Timer() {
  const [tasks]: { task: string; numTomatoes: number }[][] =
    useGetTasksAfterRender();
  const [seconds, setSeconds] = useState(1500);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>();
  const [paused, setPause] = useState(false);
  const [numTomato, setNumTomato] = useState(1);
  const [doneTomato, setDoneTomato] = useState(0);
  const [rest, setRest] = useState(false);
  const [numTask, setNumTask] = useState(1);
  const dispatch = useDispatch();
  const [pausedTime, setPauseTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const props = {
    intervalId: intervalId,
    rest: rest,
    tasks: tasks,
    paused: paused,
    numTomato: numTomato,
    seconds: seconds,
    numTask: numTask,
    handleClickSkip: handleClickSkip,
    handleClickDone: handleClickDone,
    handleClickStart: handleClickStart,
    handleClickStop: handleClickStop,
    handleClickPause: handleClickPause,
    handleClickContinue: handleClickContinue,
    setSeconds: setSeconds,
  };
  useEffect(() => {
    if (tasks.length === 0) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setDoneTomato(0);
      setNumTomato(1);
      setRest(false);
      setSeconds(1500);
      setNumTask(1);
      return;
    }

    if (!tasks[0]) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      setDoneTomato(0);
      setNumTomato(1);
      setRest(false);
      setSeconds(1500);
      setNumTask(1);
      return;
    }

    if (numTomato > tasks[0]?.numTomatoes + doneTomato) {
      clearInterval(intervalId);
      setIntervalId(undefined);
      dispatch(deleteTask(0));
      setNumTomato(1);
      setSeconds(1500);
      setDoneTomato(0);
      setRest(false);
      setNumTask((prev) => prev + 1);
    }

    if (seconds === 0) {
      if (!rest) {
        setSeconds(300);
        setRest(true);
        dispatch(addFocusTime(focusTime));
        setFocusTime(0);
        return;
      }

      if (rest) {
        clearInterval(intervalId);
        setIntervalId(undefined);
        setNumTomato((prev) => prev + 1);
        setSeconds(1500);
        dispatch(decrementTomato(0));
        dispatch(addTomatoes());
        setDoneTomato((prev) => prev + 1);
        setRest(false);
      }
    }
  }, [
    seconds,
    numTomato,
    tasks,
    dispatch,
    doneTomato,
    intervalId,
    rest,
    focusTime,
  ]);

  function timer() {
    setSeconds((prev) => prev - 1);
  }

  function handleClickStart() {
    if (intervalId || !tasks[0]) return;
    setIntervalId(setInterval(timer, 1000));
    setFocusTime(Date.now());
  }

  function handleClickStop() {
    clearInterval(intervalId);
    setIntervalId(undefined);
    setSeconds(1500);
    setPause(false);
    setRest(false);
    dispatch(addStops());
    dispatch(addFocusTime(focusTime));
    setFocusTime(0);
  }

  function handleClickPause() {
    clearInterval(intervalId);
    setIntervalId(setInterval(() => {}));
    setPause(true);
    dispatch(addStops());
    setPauseTime(Date.now());
    dispatch(addFocusTime(focusTime));
    setFocusTime(0);
  }

  function handleClickContinue() {
    setIntervalId(setInterval(timer, 1000));
    setPause(false);
    dispatch(addPauseTime(pausedTime));
    if (!rest) {
      setPauseTime(0);
      setFocusTime(Date.now());
    }
  }

  function handleClickDone() {
    setIntervalId(undefined);
    setSeconds(1500);
    setPause(false);
    setRest(false);
    dispatch(decrementTomato(0));
    setDoneTomato((prev) => prev + 1);
    setNumTomato((prev) => prev + 1);
    dispatch(addTomatoes());
    dispatch(addPauseTime(pausedTime));
    setPauseTime(0);
  }

  function handleClickSkip() {
    setRest(true);
    setSeconds(0);
    setPause(false);
    dispatch(addPauseTime(pausedTime));
    setPauseTime(0);
  }

  return <TimerComponent {...props} />;
}
