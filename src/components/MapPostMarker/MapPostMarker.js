import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks';

const MapPostMarker = ({ image }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.circle(theme)}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
            opacity: 0.6
          }}
          source={{ uri: image }}
        ></Image>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  triangle: (theme) => ({
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.backgroundColor,
    transform: [{ rotate: '180deg' }],
    marginTop: -2
  }),
  circle: (theme) => ({
    width: 38,
    height: 38,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.backgroundColor,
    backgroundColor: 'black'
  }),
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MapPostMarker;
