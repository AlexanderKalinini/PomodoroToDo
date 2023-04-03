export function getHoursMinutes(milliseconds: number): string {
  let minutes = Math.round((milliseconds / 60000) % 60);
  let hours = Math.floor(milliseconds / 3600000);
  console.log("milliseconds", milliseconds);
  console.log("HOur", hours);

  const hour = `${hours}${
    hours === 1 ? " час" : 1 < hours && hours < 5 ? " часа " : " часов "
  }`;

  return `${hours > 0 ? hour : ""} ${minutes} минут`;
}
