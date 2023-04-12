type TGetWeekStat = {
  date: string;
  tomatoes: number;
  pauseTime: number;
  stops: number;
  focusTime: number;
};

export function getWeekStat(numWeekAgo: number, stat: TGetWeekStat[]) {
  const currentWeek: string[] = [];
  const lastWeek: string[] = [];
  const twoWeeksAgo: string[] = [];
  const weekStat: TGetWeekStat[] = [];
  const millisecondsInDay = 86400000;
  let numSundays = 0;

  for (let days = 0; days < 21; days++) {
    const date = new Date(Date.now() - days * millisecondsInDay)
      .toString()
      .split(" ")
      .map((el, index) => {
        if (index < 4) {
          return el;
        }
      })
      .join(" ")
      .trim();

    if (days && date.split(" ")[0] === "Sun") {
      numSundays++;
    }

    if (numSundays === 0) {
      currentWeek.unshift(date);
    }

    if (numSundays === 1) {
      lastWeek.unshift(date);
    }

    if (numSundays === 2) {
      twoWeeksAgo.unshift(date);
    }
  }

  if (numWeekAgo === 0) {
    currentWeek.forEach((day, index) => {
      const statHasDay = stat.find((obj) => obj.date === day);
      if (statHasDay) {
        weekStat[index] = statHasDay;
      }
    });
  }

  if (numWeekAgo === 1) {
    lastWeek.forEach((day, index) => {
      const statHasDay = stat.find((obj) => obj.date === day);
      if (statHasDay) {
        weekStat[index] = statHasDay;
      }
    });
  }

  if (numWeekAgo === 2) {
    twoWeeksAgo.forEach((day, index) => {
      const statHasDay = stat.find((obj) => obj.date === day);
      if (statHasDay) {
        weekStat[index] = statHasDay;
      }
    });
  }

  return weekStat;
}
