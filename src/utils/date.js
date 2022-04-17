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

export const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString().slice(0, -3);
};

export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return isTimestampToday(timestamp)
    ? 'Today'
    : isTimestampYesterday(timestamp)
    ? 'Yesterday'
    : date.toLocaleDateString('en-US').split('/').join('-');
};

export const isTimestampToday = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  return (
    date.getDate() == today.getDate() &&
    date.getMonth() == today.getMonth() &&
    date.getFullYear() == today.getFullYear()
  );
};

export const isTimestampYesterday = (timestamp) => {
  const date = new Date(timestamp);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() == yesterday.getDate() &&
    date.getMonth() == yesterday.getMonth() &&
    date.getFullYear() == yesterday.getFullYear()
  );
};
