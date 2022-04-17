import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { DIMENS } from '../../constants';

const ImageMiddle = ({ imageUri, style }) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage style={styles.image} source={{ uri: imageUri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: 300,
    height: 270,
    borderRadius: DIMENS.common.borderRadiusMedium,
    elevation: 20
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
export default ImageMiddle;
