import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Camera as VisionCamera } from 'react-native-vision-camera';
import { Text } from '../../common';
import { translate } from '../../i18n';
import Video from 'react-native-video';
import { hasPermission } from '../../utils';
import { PERMISSIONS } from '../../constants';

export const Camera = ({ device, cameraRef, imagePath, videoPath, style }) => {
  const onFocus = async (e) => {
    const x = e.nativeEvent.x;
    const y = e.nativeEvent.y;
    await cameraRef.current.focus({
      x,
      y
    });
  };

  if (videoPath) {
    return (
      <View style={[styles.container, style]}>
        <Video
          source={{ uri: videoPath }}
          style={styles.image}
          resizeMode="cover"
          repeat
        />
      </View>
    );
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
          video
          audio
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
