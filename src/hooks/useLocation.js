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
        console.log('hello');
        return;
      }
      console.log('helllloooo');
      const config = {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000
      };
      Geolocation.getCurrentPosition(
        (location) => setLocation(location),
        (e) => console.log(e),
        config
      );
    })();
  }, []);

  useEffect(() => {
    console.log('locationuu', location);
  }, [location]);
  return [location, setLocation];
};
