import React, { useEffect, useRef, useState } from 'react';
import {
  DIMENS,
  PERMISSIONS,
  SPACING,
  VIDEO_MAX_LENGTH
} from '../../constants';
import Camera from '../Camera/Camera';
import { CommonActions } from '@react-navigation/native';
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

import { useLocation } from '../../hooks';
import useTheme from '../../hooks/useTheme';
import { translate } from '../../i18n';
import { HOME_SCREEN, PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import {
  convertSecondsToMinAndSecs,
  getFrameFromVideo,
  getGeoLocation,
  getSecondsSinceTimestamp,
  getThumbnailFromVideo,
  handleDownloadToCameraRoll,
  hasAndroidPermission,
  hasPermission
} from '../../utils';
import { showSnackbar } from '../../utils/showSnackbar';
import LoadingContainer from '../LoadingContainer/LoadingContainer';
import CameraButton from '../CameraButton/CameraButton';

const IMAGE_PATH_PREFIX = 'file://';
const QUALITY_PRIORITAZION = 'quality';

const CameraView = ({
  onButtonPress,
  buttonText,
  cameraButtonText,
  buttonLoading
}) => {
  const { theme } = useTheme();
  const devices = useCameraDevices();
  const [device, setDevice] = useState();
  const [cameraIsAuthorized, setCameraIsAuthorized] = useState();
  const [microphoneIsAuthorized, setMicrophoneIsAuthorized] = useState();
  const [isFlash, setIsFlash] = useState(false);
  const cameraRef = useRef();
  const [imagePath, setImagePath] = useState();
  const [videoPath, setVideoPath] = useState();
  const videoTimeout = useRef();
  const [isFilming, setIsFilming] = useState();
  const [isAuthenticating, setIsAuthenticating] = useState();
  const isFilmingRef = useRef();

  useEffect(() => {
    isFilmingRef.current = isFilming;
  }, [isFilming]);

  useEffect(() => {
    (async () => {
      setIsAuthenticating(true);
      await authorizeCamera();
      await authorizeMicrophone();
      setIsAuthenticating(false);
    })();
  }, []);

  useEffect(() => {
    setDevice(devices.back);
  }, [devices]);

  const authorizeCamera = async () => {
    if (await hasPermission(PERMISSIONS.CAMERA)) {
      setCameraIsAuthorized(true);
    }
  };

  const authorizeMicrophone = async () => {
    if (await hasPermission(PERMISSIONS.MICROPHONE)) {
      setMicrophoneIsAuthorized(true);
    }
  };

  const handleTakePhoto = async () => {
    console.log('take photo');
    if (!cameraRef.current) {
      return;
    }
    const image = await cameraRef.current.takePhoto({
      flash: isFlash ? 'on' : 'off',
      qualityPrioritazion: QUALITY_PRIORITAZION
    });
    setImagePath(IMAGE_PATH_PREFIX + image.path);
  };

  const handleVideoFinished = async (video) => {
    console.log('video', video);
    setVideoPath(video.path);
  };

  const handleStartVideo = () => {
    console.log('start video');
    if (!cameraRef.current) {
      return;
    }
    setIsFilming(true);
    cameraRef.current.startRecording({
      flash: isFlash ? 'on' : 'off',
      onRecordingFinished: (video) => handleVideoFinished(video),
      onRecordingError: (error) => console.error(error)
    });
    videoTimeout.current = setTimeout(() => {
      handleStopVideo();
    }, VIDEO_MAX_LENGTH * 1000);
  };

  const handleStopVideo = async () => {
    console.log('stop video', isFilmingRef.current);
    if (!isFilmingRef.current || !cameraRef.current) {
      return;
    }
    console.log('hello?');
    clearTimeout(videoTimeout.current);
    if (cameraRef.current && !videoPath) {
      await cameraRef.current.stopRecording();
    }
    setIsFilming(false);
  };

  const handleDeletePhoto = () => {
    setImagePath(null);
    setVideoPath(null);
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

  if (!device || isAuthenticating) {
    return <LoadingContainer />;
  }

  if (!cameraIsAuthorized || !microphoneIsAuthorized) {
    return <Text>{translate('camera.notAuthenticated')}</Text>;
  }

  return (
    <>
      <View style={styles.containerFull}>
        <Camera
          style={styles.cameraFull}
          cameraRef={cameraRef}
          device={device}
          imagePath={imagePath}
          videoPath={videoPath}
        />
      </View>
      <Header
        style={styles.header}
        leftItems={
          //TODO: disable all buttons while posting
          (imagePath || videoPath) && [
            {
              icon: 'close',
              onPress: handleDeletePhoto,
              disabled: buttonLoading,
              iconSize: 'small',
              variant: 'transparent',
              color: 'white'
            }
          ]
        }
      />

      <View style={styles.bottomContainer(theme, imagePath || videoPath)}>
        {videoPath || imagePath ? (
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
                onPress={() =>
                  handleDownloadToCameraRoll(
                    imagePath || videoPath,
                    false,
                    Boolean(videoPath)
                  )
                }
                color="white"
              />

              <Spacer spacing="medium" orientation="horizontal" />
              <View>
                <Button
                  title={buttonText}
                  onPress={() =>
                    onButtonPress(imagePath || videoPath, Boolean(videoPath))
                  } // params = (path, isVideo)
                  loading={buttonLoading}
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
                isFilming={isFilming}
                onLongPress={handleStartVideo}
                onPressOut={handleStopVideo}
                text={cameraButtonText}
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

export default CameraView;
