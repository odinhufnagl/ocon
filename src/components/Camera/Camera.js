import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Camera as VisionCamera } from 'react-native-vision-camera';
import { Text } from '../../common';
import { translate } from '../../i18n';

export const Camera = ({
  device,
  cameraRef,
  cameraIsAuthorized,
  imagePath,
  style,
  noCameraFoundText = translate('camera.noCameraFound'),
  notAuthenticatedText = translate('camera.notAuthenticated')
}) => {
  const onFocus = async (e) => {
    const x = e.nativeEvent.x;
    const y = e.nativeEvent.y;
    await cameraRef.current.focus({
      x,
      y
    });
  };

  if (!device) {
    return <Text>{noCameraFoundText}</Text>;
  }

  if (!cameraIsAuthorized) {
    return <Text>{notAuthenticatedText}</Text>;
  }

  if (imagePath) {
    return (
      <View style={[styles.container, style]}>
        <Image style={styles.image} source={{ uri: imagePath }} />
      </View>
    );
  }

  return (
    <TapGestureHandler onBegan={onFocus}>
      <View style={[styles.container, style]}>
        <VisionCamera
          style={styles.image}
          device={device}
          isActive
          ref={cameraRef}
          photo
          enableZoomGesture
        />
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  },
  container: {
    width: '100%',
    height: '100%'
  }
});

export default Camera;
