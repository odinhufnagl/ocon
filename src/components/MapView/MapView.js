import React from 'react';
import { StyleSheet } from 'react-native';
import RNMapView from 'react-native-maps';
import { mapStyle } from './mapStyle';

const MAX_ZOOM = 5;
const MIN_ZOOM = 0;

const MapView = ({ onMapPress }) => {
  return (
    <RNMapView
      style={styles.container}
      maxZoomLevel={MAX_ZOOM}
      minZoomLevel={MIN_ZOOM}
      customMapStyle={mapStyle}
      onPress={(e) => onMapPress(e.nativeEvent)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '105%'
  }
});

export default MapView;
