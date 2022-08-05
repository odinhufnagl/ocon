import { PermissionsAndroid } from 'react-native';
import { translate } from '../i18n';
import { hasAndroidPermission, hasPermission } from './permission';
import { showSnackbar } from './showSnackbar';
import RNFetchBlob from 'rn-fetch-blob';
import { save } from '@react-native-community/cameraroll';
import { PERMISSIONS } from '../constants';

export const saveImageToCameraRoll = async (url, isRemote = true) => {
  if (!(await hasPermission(PERMISSIONS.WRITE_PHOTOS))) {
    return;
  }
  let res = { data: url };
  if (isRemote) {
    res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png'
    }).fetch('GET', url);
  }
  if (!res) {
    return;
  }
  const res2 = await save(res.data);
  if (!res2) {
    return;
  }
  return true;
};

export const handleDownloadImage = async (url, isRemote) => {
  const res = await saveImageToCameraRoll(url, isRemote);
  if (!res) {
    showSnackbar(translate('snackbar.error'), 'error');
    return;
  }
  showSnackbar(translate('snackbar.imageDownloaded'), 'success');
};
