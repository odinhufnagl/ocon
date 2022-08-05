import { CommonActions } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import LinearGradient from 'react-native-linear-gradient';
import { useCameraDevices } from 'react-native-vision-camera';
import { v4 as uuidv4 } from 'uuid';
import { getImage, saveImage } from '../../api/firebase';
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
  Carousel,
  LoadingContainer
} from '../../components';
import { CAMERA_TIMER, DIMENS, PERMISSIONS, SPACING } from '../../constants';
import { useLocation } from '../../hooks';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { HOME_SCREEN, PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import {
  convertSecondsToMinAndSecs,
  getSecondsSinceTimestamp,
  handleDownloadImage,
  hasAndroidPermission,
  hasPermission
} from '../../utils';
import { showSnackbar } from '../../utils/showSnackbar';

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

const IMAGE_PATH_PREFIX = 'file://';
const QUALITY_PRIORITAZION = 'quality';

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
        {item.position === POST_POSITIONS.FULL ? (
          <View style={styles.postTypesItemFull(theme, ITEM_HEIGHT)} />
        ) : (
          <LinearGradient
            colors={[colorTop, colorBottom]}
            style={styles.postTypesItemMiddle(ITEM_HEIGHT, ITEM_HEIGHT)}
          />
        )}
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
  const { theme } = useTheme();
  const translateKey = 'cameraScreen.';
  const devices = useCameraDevices();
  const [device, setDevice] = useState();
  const [count, setCount] = useState(route?.params?.count);
  const [currentType, setCurrentType] = useState(POST_TYPES[0]);
  const [isFlash, setIsFlash] = useState(false);
  const cameraRef = useRef();
  const [imagePath, setImagePath] = useState();
  const [cameraIsAuthorized, setCameraIsAuthorized] = useState(false);
  const [loadingPostPhoto, setLoadingPostPhoto] = useState(false);
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [latestNotificationId, setLatestNotificationId] = useState(
    route?.params?.latestNotification?.id
  );
  const [location, setLocation] = useState();

  useEffect(() => {
    (async () => {
      await fetchLocation();
      await authorizeCamera();
      await getStartCount();
      setLoading(false);
      let interval = startTimer();
      return () => clearInterval(interval);
    })();
  }, []);

  useEffect(() => {
    setDevice(devices.back);
  }, [devices]);

  const onTimeIsUp = () => {
    //TODO: navigate to screen where it says like "time is up!"
    navigateFurther();
  };

  const startTimer = () => {
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          onTimeIsUp();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return interval;
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
    const secondsSinceTimestamp = getSecondsSinceTimestamp(
      latestNotification.createdAt
    );
    if (secondsSinceTimestamp > CAMERA_TIMER) {
      onTimeIsUp();
      return;
    }
    setCount(CAMERA_TIMER - secondsSinceTimestamp);
  };

  const authorizeCamera = async () => {
    if (await hasPermission(PERMISSIONS.CAMERA)) {
      setCameraIsAuthorized(true);
    }
  };

  const fetchLocation = async () => {
    if (!(await hasPermission(PERMISSIONS.LOCATION))) {
      return;
    }
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
  };

  const handleTakePhoto = async () => {
    const image = await cameraRef.current.takePhoto({
      flash: isFlash ? 'on' : 'off',
      qualityPrioritazion: QUALITY_PRIORITAZION
    });
    setImagePath(IMAGE_PATH_PREFIX + image.path);
  };

  const handleDeletePhoto = () => {
    setImagePath(null);
  };

  const handleFlipCamera = () => {
    if (device === devices.front) {
      setDevice(devices.back);
    } else {
      setDevice(devices.front);
    }
  };
  const handleFlashOn = () => {
    setIsFlash((prev) => !prev);
  };

  const handlePostPhoto = async () => {
    setLoadingPostPhoto(true);
    //TODO: navigate to loadingScreen? later version perhaps?
    if (typeof latestNotificationId !== 'number') {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }
    const randomFileName = uuidv4();
    const res = await saveImage({ uri: imagePath, fileName: randomFileName });
    if (!res) {
      showSnackbar(translate('snackbar.error'), 'error');
      setLoadingPostPhoto(false);
      return;
    }

    const returnedURL = await getImage({ fileName: randomFileName });
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
    const formattedAddress = address.formatted_address;
    const countryCode = address.address_components.find(({ types }) =>
      types.includes('country')
    ).short_name;

    const res2 = await createPost({
      userId: currentUser.id,
      image: returnedURL,
      notificationId: latestNotificationId,
      postTypeId: currentType.id,
      location: formattedAddress,
      countryCode
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

  if (loading || !device || !location) {
    return <LoadingContainer />;
  }

  return (
    <>
      <ConditionalWrapper
        condition={currentType.colorTop && currentType.colorBottom}
        wrapper={(children) => (
          <LinearGradient
            colors={[currentType.colorTop, currentType.colorBottom]}
            style={styles.linearGradientBackground}
          >
            {children}
          </LinearGradient>
        )}
      >
        <View style={getContainerStyle(currentType.position)}>
          <Camera
            style={getCameraStyle(currentType.position)}
            cameraRef={cameraRef}
            cameraIsAuthorized={cameraIsAuthorized}
            device={device}
            imagePath={imagePath}
          />
        </View>
      </ConditionalWrapper>
      <Header
        style={styles.header}
        leftItems={
          //TODO: disable all buttons while posting
          imagePath && [
            {
              icon: 'close',
              onPress: handleDeletePhoto,
              disabled: loadingPostPhoto,
              iconSize: 'small',
              variant: 'transparent',
              color: 'white'
            }
          ]
        }
      />

      <View style={styles.bottomContainer(theme, imagePath)}>
        {imagePath ? (
          <>
            <Spacer spacing="medium" />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <IconButton
                icon="download"
                variant="flatten"
                onPress={() => handleDownloadImage(imagePath, false)}
                color="white"
              />
              <Spacer spacing="medium" orientation="horizontal" />
              <View>
                <Button
                  title={translate(translateKey + 'postButton')}
                  onPress={handlePostPhoto}
                  loading={loadingPostPhoto}
                  style={styles.postButton}
                  shadow={false}
                  icon="chevronRight"
                />
              </View>
            </View>

            <Spacer spacing="medium" />
          </>
        ) : (
          <>
            {/*<PostTypesCarousel
              setCurrentType={setCurrentType}
              currentType={currentType}
        />*/}
            <Spacer spacing="medium" />
            <View style={styles.cameraButtonsContainer}>
              <IconButton
                icon={isFlash ? 'flashOn' : 'flashOff'}
                iconSize={'medium'}
                onPress={handleFlashOn}
                variant="transparent"
                color="white"
              />
              <Spacer orientation="horizontal" spacing="medium" />
              <CameraButton
                text={convertSecondsToMinAndSecs(count)}
                onPress={handleTakePhoto}
              />
              <Spacer orientation="horizontal" spacing="medium" />
              <IconButton
                icon="flipCamera"
                onPress={handleFlipCamera}
                variant="transparent"
                color="white"
              />
            </View>
            <Spacer spacing="medium" />
          </>
        )}
      </View>
    </>
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
