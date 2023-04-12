export function getTimeHMS(milliseconds: number): string {
  const minutes = Math.floor((milliseconds / 60000) % 60);
  const hours = Math.floor(milliseconds / 3600000);
  const seconds = Math.round((milliseconds / 1000) % 60);

  // const hour = `${hours}${
  //   hours === 1 ? " час" : 1 < hours && hours < 5 ? " часа " : " часов "
  // }`;

  return `${hours ? hours + " ч " : ""}${minutes ? minutes + " м " : ""}${
    seconds ? seconds + " с " : ""
  }`;
}
