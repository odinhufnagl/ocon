import moment from 'moment';

export const getLastWeekDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7); // Get date from 7 days before
  return date.toISOString().split('T')[0]; // Format date in yyyy-mm-dd form
};

export const getSecondsSinceTimestamp = (timestamp) => {
  const now = moment();
  const secondDate = moment(timestamp);
  return moment.duration(now.diff(secondDate)).asSeconds();
};

export const getCurrentDate = () => {
  const now = moment();
  return now.format('YYYY-MM-DD');
};

export const getCurrentLocaleDate = () =>
  moment().format('YYYY-MM-DD HH:mm:ss');

export const getTommorowsDate = () => {
  const now = moment();
  now.add(24, 'hours');
  return now.format('YYYY-MM-DD');
};
export const getYesterdaysDate = () => {
  const now = moment();
  now.subtract(24, 'hours');
  return now.format('YYYY-MM-DD');
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
