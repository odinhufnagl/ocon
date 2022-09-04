import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, PermissionsAndroid, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import LinearGradient from 'react-native-linear-gradient';
import {
  useCameraDevices,
  Camera as VisionCamera
} from 'react-native-vision-camera';
import { v4 as uuidv4 } from 'uuid';
import { getFile, saveFile } from '../../api/firebase';
import {
  coordsToAddress,
  getAddressesFromCoords,
  getAddressFromCoords,
  getLocationFromCoords
} from '../../api/googleMaps';
import { createPost, getLatestNotification } from '../../api/graphql/requests';
import Geolocation from '@react-native-community/geolocation';
import {
  Button,
  ConditionalWrapper,
  Header,
  IconButton,
  Spacer,
  Text
} from '../../common';
import {
  Camera,
  CameraButton,
  CameraView,
  Carousel,
  LoadingContainer
} from '../../components';
import {
  CAMERA_TIMER,
  DIMENS,
  PERMISSIONS,
  SPACING,
  VIDEO_MAX_LENGTH
} from '../../constants';
import { useLocation } from '../../hooks';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { HOME_SCREEN, PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import {
  convertSecondsToMinAndSecs,
  getCountryByAddress,
  getCountryCodeByAddress,
  getCurrentLocaleDate,
  getFormattedAddressByAddress,
  getFrameFromVideo,
  getGeoLocation,
  getSecondsSinceTimestamp,
  getThumbnailFromVideo,
  handleDownloadToCameraRoll,
  hasAndroidPermission,
  hasPermission,
  shouldShowCamera
} from '../../utils';
import { showSnackbar } from '../../utils/showSnackbar';
import moment from 'moment';
export const POST_POSITIONS = {
  FULL: 'full',
  MIDDLE: 'middle'
};
export const POST_TYPES = [
  { id: 1, position: POST_POSITIONS.FULL },
  {
    id: 2,
    colorTop: '#403681',
    colorBottom: '#8E8E8E',
    position: POST_POSITIONS.MIDDLE
  },
  {
    id: 3,
    colorTop: '#FF0000',
    colorBottom: '#8E8E8E',
    position: POST_POSITIONS.MIDDLE
  },
  {
    id: 4,
    colorTop: '#02B55F',
    colorBottom: '#8E8E8E',
    position: POST_POSITIONS.MIDDLE
  },
  {
    id: 5,
    colorTop: '#000000',
    colorBottom: '#8E8E8E',
    position: POST_POSITIONS.MIDDLE
  },
  {
    id: 6,
    colorTop: '#ffffff',
    colorBottom: '#ffffff',
    position: POST_POSITIONS.MIDDLE
  }
];

const getCameraStyle = (position) => {
  switch (position) {
    case POST_POSITIONS.FULL:
      return styles.cameraFull;
    case POST_POSITIONS.MIDDLE:
      return styles.cameraMiddle;
    default:
      break;
  }
};

const getContainerStyle = (position) => {
  switch (position) {
    case POST_POSITIONS.FULL:
      return styles.containerFull;
    case POST_POSITIONS.MIDDLE:
      return styles.containerMiddle;
    default:
      break;
  }
};

const PostTypesCarousel = ({ setCurrentType, currentType }) => {
  const { theme } = useTheme();

  const ITEM_HEIGHT = 65;

  const onSnapToItem = (item, index) => {
    setCurrentType(item);
  };

  const renderItem = ({ item, index }) => {
    const { colorTop, colorBottom } = item;
    return (
      <View style={styles.postTypesItemContainer(ITEM_HEIGHT)}>
        <View style={styles.postTypesItemFull(theme, ITEM_HEIGHT)} />
      </View>
    );
  };

  return (
    <Carousel
      renderItem={renderItem}
      data={POST_TYPES}
      onSnapToItem={onSnapToItem}
      firstItem={POST_TYPES.indexOf(currentType)}
    />
  );
};

export const CameraScreen = ({ navigation, route }) => {
  const intervalRef = useRef();
  const translateKey = 'cameraScreen.';
  const [count, setCount] = useState(route?.params?.count);
  const [loadingPostPhoto, setLoadingPostPhoto] = useState(false);
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [latestNotificationId, setLatestNotificationId] = useState(
    route?.params?.latestNotification?.id
  );
  const [appState, setAppState] = useState();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (AppState.currentState === 'active') {
      setAppState('active');
    }
    const subscribe = AppState.addEventListener(
      'change',
      async (nextAppState) => {
        setAppState(nextAppState);
      }
    );
    return () => subscribe.remove();
  }, []);

  useEffect(() => {
    (async () => {
      if (appState !== 'active') {
        return;
      }
      setLoading(true);
      await getGeoLocation(setLocation);
      await getStartCount();
      setLoading(false);
      if (intervalRef.current) {
        return;
      }
      let interval = startTimer();
      return () => clearInterval(interval);
    })();
  }, [appState]);

  const handleTimeIsUp = () => {
    //TODO: navigate to screen where it says like "time is up!"
    navigateFurther();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          handleTimeIsUp();
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return intervalRef.current;
  };

  const getStartCount = async () => {
    const latestNotification =
      route?.params?.latestNotification ||
      (await getLatestNotification(currentUser.id));

    setLatestNotificationId(latestNotification.id);
    const userHasAlreadyPosted =
      latestNotification?.currentUsersPosts?.length > 0;
    if (userHasAlreadyPosted) {
      navigateFurther();
      return;
    }

    if (!shouldShowCamera(latestNotification.createdAt)) {
      handleTimeIsUp();
      return;
    }
    const secondsSinceNotification = getSecondsSinceTimestamp(
      latestNotification.createdAt
    );
    setCount(CAMERA_TIMER - secondsSinceNotification);
  };

  const handlePostVideo = async (path) => {
    setLoadingPostPhoto(true);
    const thumbnail = await getThumbnailFromVideo(path);

    if (typeof latestNotificationId !== 'number' || !thumbnail) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const randomFileNameVideo = uuidv4();
    const randomFileNameThumbnail = uuidv4();
    const resVideo = await saveFile({
      uri: path,
      fileName: randomFileNameVideo
    });
    const resThumbnail = await saveFile({
      uri: thumbnail,
      fileName: randomFileNameThumbnail
    });
    if (!resVideo || !resThumbnail) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const returnedVideoPath = await getFile({ fileName: randomFileNameVideo });
    const returnedThumbnailPath = await getFile({
      fileName: randomFileNameThumbnail
    });
    if (!returnedVideoPath || !returnedThumbnailPath) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    const address = await getAddressFromCoords(location.coords);
    if (!address) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const formattedAddress = getFormattedAddressByAddress(address);
    const countryCode = getCountryCodeByAddress(address);

    const res2 = await createPost({
      userId: currentUser.id,
      video: returnedVideoPath,
      thumbnail: returnedThumbnailPath,
      notificationId: latestNotificationId,
      postTypeId: 2,
      location: formattedAddress,
      countryCode,
      createdAtLocale: getCurrentLocaleDate()
    });

    if (!res2) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    showSnackbar(translate('snackbar.videoPosted'), 'success');
    navigateFurther();
    setLoadingPostPhoto(false);
  };

  const handlePostPhoto = async (path) => {
    setLoadingPostPhoto(true);
    if (typeof latestNotificationId !== 'number') {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const randomFileName = uuidv4();
    const res = await saveFile({ uri: path, fileName: randomFileName });
    if (!res) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    const returnedURL = await getFile({ fileName: randomFileName });
    if (!returnedURL) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    const address = await getAddressFromCoords(location.coords);
    if (!address) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const formattedAddress = getFormattedAddressByAddress(address);
    const countryCode = getCountryCodeByAddress(address);

    const res2 = await createPost({
      userId: currentUser.id,
      image: returnedURL,
      notificationId: latestNotificationId,
      postTypeId: 1,
      location: formattedAddress,
      countryCode,
      createdAtLocale: getCurrentLocaleDate()
    });

    if (!res2) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    showSnackbar(translate('snackbar.imagePosted'), 'success');
    navigateFurther();
    setLoadingPostPhoto(false);
  };

  const navigateFurther = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: HOME_SCREEN },
          {
            name: PROFILE_STACK,
            params: {
              screen: PROFILE_SCREEN,
              params: { user: currentUser }
            }
          }
        ]
      })
    );
  };

  if (loading || !location) {
    return <LoadingContainer />;
  }

  return (
    <CameraView
      onButtonPress={(path, isVideo) =>
        isVideo ? handlePostVideo(path) : handlePostPhoto(path)
      }
      cameraButtonText={convertSecondsToMinAndSecs(count)}
      buttonText={translate(translateKey + 'postButton')}
      buttonLoading={loadingPostPhoto}
    />
  );
};

const styles = StyleSheet.create({
  containerFull: {
    flex: 1
  },
  containerMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraFull: {
    flex: 1
  },
  cameraMiddle: {
    overflow: 'hidden',
    width: 300,
    height: 270,
    borderRadius: DIMENS.common.borderRadiusMedium,
    elevation: 20
  },
  bottomContainer: (theme, showBackgroundColor) => ({
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: SPACING.medium,
    backgroundColor: showBackgroundColor && 'rgba(0, 0,0, 0.5)'
  }),
  header: {
    position: 'absolute',
    top: 0
  },
  postTypesItemContainer: (height) => ({
    height,
    justifyContent: 'center',
    alignItems: 'center'
  }),
  postTypesItemFull: (theme, height) => ({
    width: height * 0.55,
    backgroundColor: theme.white,
    height: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.BLACK
  }),
  postTypesItemMiddle: (height, width) => ({
    width: width,
    height: height,
    borderRadius: 1000
  }),
  linearGradientBackground: {
    width: '100%',
    height: '100%'
  },
  cameraButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  postButton: {
    paddingHorizontal: SPACING.medium
  },
  downloadButton: {
    width: 50,
    height: 50
  }
});

export default CameraScreen;
