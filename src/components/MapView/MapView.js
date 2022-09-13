import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import RNMapView, { Callout, Marker } from 'react-native-maps';
import { getGeoLocation } from '../../utils';
import MapPostMarker from '../MapPostMarker/MapPostMarker';
import { mapStyle } from './mapStyle';
import geocluster from 'geocluster';
import ClusteredMapView from 'react-native-maps-super-cluster';
import { Text } from '../../common';
import MapClusterMarker from '../MapClusterMarker/MapClusterMarker';

const MAX_ZOOM = 5;
const MIN_ZOOM = 0;

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12
};

const MapView = ({ onMapPress }) => {
  const map = useRef();
  const coordinates = [
    {
      location: {
        latitude: 59.32938,
        longitude: 18.06871
      },
      image:
        'https://firebasestorage.googleapis.com/v0/b/capture-it-93c05.appspot.com/o/062b7142-54d4-43f2-bc0f-8947bf1466be?alt=media&token=e1e20368-4020-4181-a278-b3290e563264'
    },
    {
      location: {
        latitude: 55.60587,
        longitude: 13.00073
      },
      image:
        'https://firebasestorage.googleapis.com/v0/b/capture-it-93c05.appspot.com/o/1110b322-2d28-484a-8045-b77417366167?alt=media&token=c21398e1-39b3-4e99-a84e-2bce1dd43829'
    },
    {
      location: {
        latitude: 59.32938 + 0.1,
        longitude: 18.06871
      },
      image:
        'https://firebasestorage.googleapis.com/v0/b/capture-it-93c05.appspot.com/o/1110b322-2d28-484a-8045-b77417366167?alt=media&token=c21398e1-39b3-4e99-a84e-2bce1dd43829'
    },
    {
      location: {
        latitude: 59.32938 - 0.1,
        longitude: 18.06871
      },
      image:
        'https://firebasestorage.googleapis.com/v0/b/capture-it-93c05.appspot.com/o/181b4d57-9282-44ad-be8d-b9779fb66a79?alt=media&token=f3c9bf0b-d34d-4204-9821-bd085d4c4a94'
    }
  ];

  const renderCluster = (cluster, onPress) => {
    console.log('cluster', cluster);

    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = map.current.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);
    console.log('clusteredPoints', clusteredPoints[0].properties.item.image);
    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <MapClusterMarker
          text={clusteredPoints.length}
          images={clusteredPoints.map(
            ({ properties }) => properties.item.image
          )}
        ></MapClusterMarker>
        {/*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */}
      </Marker>
    );
  };

  const renderMarker = (data) => (
    <Marker key={data.id || Math.random()} coordinate={data.location}>
      <MapPostMarker image={data.image}></MapPostMarker>
    </Marker>
  );
  return (
    <ClusteredMapView
      style={styles.container}
      customMapStyle={mapStyle}
      onPress={(e) => onMapPress(e.nativeEvent)}
      renderMarker={renderMarker}
      renderCluster={renderCluster}
      data={coordinates}
      initialRegion={INIT_REGION}
      ref={(r) => {
        map.current = r;
      }}
    >
      {/*coordinates.map((coordinate) => (
        <Marker
          coordinate={coordinate}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingRight: 3
          }}
        >
          <MapPostMarker
            image={
              'https://firebasestorage.googleapis.com/v0/b/capture-it-93c05.appspot.com/o/062b7142-54d4-43f2-bc0f-8947bf1466be?alt=media&token=e1e20368-4020-4181-a278-b3290e563264'
            }
          ></MapPostMarker>
        </Marker>
          ))*/}
    </ClusteredMapView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
});

export default MapView;
