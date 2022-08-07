import { PermissionsAndroid, Platform } from 'react-native';
import {
  PERMISSIONS as IOS_PERMISSIONS,
  RESULTS,
  check,
  request
} from 'react-native-permissions';
import { PERMISSIONS } from '../constants';

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
      android: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    },
    [PERMISSIONS.READ_PHOTOS]: {
      ios: IOS_PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    },
    [PERMISSIONS.MICROPHONE]: {
      ios: IOS_PERMISSIONS.IOS.MICROPHONE,
      android: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    }
  }[type][platform]);

export const hasPermission = async (type) => {
  const permissionType = getPlatformSpecificType(type, Platform.OS);

  const res = await check(permissionType);
  if (res === RESULTS.GRANTED) {
    return true;
  } else if (res === RESULTS.DENIED) {
    console.log('res', res);
    const res2 = await request(permissionType);
    console.log('res2', res2);
    return res2 === RESULTS.GRANTED;
  }
};
