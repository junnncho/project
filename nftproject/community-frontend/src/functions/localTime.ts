export const localTime = (time: string): string => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  const date = new Date(time);
  date.setTime(date.getTime() - now.getTimezoneOffset() * 60 * 1000);

  const diffSec = now.getTime() - date.getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  var month = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();
  const result =
    diffSec > 7 * oneDay
      ? `${monthNames[month]} ${day}, ${year}`
      : diffSec > oneDay
      ? `${Math.trunc(diffSec / oneDay)} days ago`
      : diffSec > oneHour
      ? `${Math.trunc(diffSec / oneHour)} hours ago`
      : `${Math.trunc(diffSec / oneMinute)} minutes ago`;

  return result;
};
