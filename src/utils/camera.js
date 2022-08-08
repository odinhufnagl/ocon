import { CAMERA_TIMER } from '../constants';
import { getSecondsSinceTimestamp } from './date';

export const shouldShowCamera = (latestNotificationCreatedAt) => {
  const secondsSinceTimestamp = getSecondsSinceTimestamp(
    latestNotificationCreatedAt
  );
  return (
    secondsSinceTimestamp &&
    secondsSinceTimestamp < CAMERA_TIMER &&
    secondsSinceTimestamp > 0
  );
};
