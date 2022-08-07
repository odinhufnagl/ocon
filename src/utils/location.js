import { PERMISSIONS } from '../constants';
import { hasPermission } from './permission';
import Geolocation from '@react-native-community/geolocation';
export const getGeoLocation = async (onSuccess) => {
  if (!(await hasPermission(PERMISSIONS.LOCATION))) {
    return;
  }
  const config = {
    enableHighAccuracy: false
  };
  Geolocation.getCurrentPosition(
    (location) => onSuccess(location),
    (e) => console.log(e),
    config
  );
};
