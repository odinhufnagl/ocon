import { PermissionsAndroid } from 'react-native';
import { translate } from '../i18n';

import { showSnackbar } from './showSnackbar';
import RNFetchBlob from 'rn-fetch-blob';
import { save } from '@react-native-community/cameraroll';
import { PERMISSIONS } from '../constants';
import { hasPermission } from './permission';

export const saveToCameraRoll = async (url, isRemote = true, isVideo) => {
  if (!(await hasPermission(PERMISSIONS.WRITE_PHOTOS))) {
    return;
  }

  let res = { data: url };
  if (isRemote) {
    res = await RNFetchBlob.config({
      fileCache: true,
      appendExt: isVideo ? 'mp4' : 'png'
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

export const handleDownloadToCameraRoll = async (url, isRemote, isVideo) => {
  console.log('url', url);
  const res = await saveToCameraRoll(url, isRemote, isVideo);
  if (!res) {
    showSnackbar(translate('snackbar.error'), 'error');
    return;
  }
  showSnackbar(translate('snackbar.postDownloaded'), 'success');
};
