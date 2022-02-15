export const getLastWeekDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7); // Get date from 7 days before
  return date.toISOString().split('T')[0]; // Format date in yyyy-mm-dd form
};

export const getSecondsSinceTimestamp = (timestamp) => {
  const now = new Date();
  const secondDate = new Date(timestamp);

  return (now - secondDate) / 1000;
};

export const convertSecondsToMinAndSecs = (seconds) => {
  const mins = Math.floor((seconds % 3600) / 60);
  const secondsOver = Math.floor(seconds % 60);

  return `${mins}:${secondsOver < 10 ? '0' : ''}${secondsOver}`;
};
