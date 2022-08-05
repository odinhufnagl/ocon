import { PermissionsAndroid, Platform } from 'react-native';
import {
  PERMISSIONS as IOS_PERMISSIONS,
  RESULTS,
  check,
  request
} from 'react-native-permissions';
import { PERMISSIONS } from '../constants';

export const hasAndroidPermission = async (type) => {
  const hasPermission = await check(type);
  console.log('hasPermission', hasPermission);
  if (hasPermission) {
    return true;
  }
  const status = await PermissionsAndroid.request(type);
  console.log('status', status);
  return status === 'granted';
};

export const hasIOSPermission = async (type) => {
  console.log('type', type);
  const res = await check(type);
  console.log('helllo');
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    console.log('res', res);
    const res2 = await request(type);
    console.log('res2', res2);
    return res2 === RESULTS.GRANTED;
  }
};
const getPlatformSpecificType = (type, platform) =>
  ({
    [PERMISSIONS.CAMERA]: {
      ios: IOS_PERMISSIONS.IOS.CAMERA,
      android: PermissionsAndroid.PERMISSIONS.CAMERA
    },
    [PERMISSIONS.LOCATION]: {
      ios: IOS_PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    },
    [PERMISSIONS.WRITE_PHOTOS]: {
      ios: IOS_PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      android: PermissionsAndroid.PERMISSIONS.WRITE_STORAGE
    },
    [PERMISSIONS.READ_PHOTOS]: {
      ios: IOS_PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PermissionsAndroid.PERMISSIONS.READ_STORAGE
    }
  }[type][platform]);

export const hasPermission = async (type) => {
  console.log('type', type);
  if (Platform.OS === 'android')
    return await hasAndroidPermission(getPlatformSpecificType(type, 'android'));
  if (Platform.OS === 'ios')
    return await hasIOSPermission(getPlatformSpecificType(type, 'ios'));
};
