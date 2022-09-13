import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks';
import { Text } from '../../common';
const MapClusterMarker = ({ images, text }) => {
  const { theme } = useTheme();
  console.log(images);
  return (
    <View style={styles.container}>
      <View style={[styles.circleSmall(theme), { marginRight: -18 }]}>
        <Image
          source={{ uri: images.length >= 1 && images[1] }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
            opacity: 0.5
          }}
        ></Image>
      </View>
      <View style={styles.circle(theme)}>
        <Image
          source={{ uri: images[0] }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
            opacity: 0.6
          }}
        ></Image>
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            paddingTop: 3
          }}
        ></View>
      </View>
      <View
        style={[styles.circleSmall(theme), { marginLeft: -18, zIndex: -10 }]}
      >
        <Image
          source={{ uri: images.length >= 2 && images[2] }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
            opacity: 0.5
          }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: (theme) => ({
    width: 38,
    height: 38,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.backgroundColor,
    backgroundColor: 'black'
  }),
  circleSmall: (theme) => ({
    width: 28,
    height: 28,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.backgroundColor,
    backgroundColor: 'black'
  }),
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default MapClusterMarker;
