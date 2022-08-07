import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import { PERMISSIONS } from '../constants';
import { hasAndroidPermission, hasPermission } from '../utils';
export const useLocation = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    (async () => {
      if (!(await hasPermission(PERMISSIONS.LOCATION))) {
        return;
      }

      const config = {
        enableHighAccuracy: false
      };
      Geolocation.getCurrentPosition(
        (location) => setLocation(location),
        (e) => console.log(e),
        config
      );
    })();
  }, []);

  return [location, setLocation];
};
