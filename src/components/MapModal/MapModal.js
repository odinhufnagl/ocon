import React, { useState } from 'react';
import { Modal as RNModal, StyleSheet, View } from 'react-native';
import { Geojson } from 'react-native-maps';
import { getAddressFromCoords } from '../../api/googleMaps';
import { Button, Container, IconButton, Text } from '../../common';
import { COUNTRIES, SPACING } from '../../constants';
import { translate } from '../../i18n';
import { getCountryCodeByAddress, showSnackbar } from '../../utils';
import LoadingContainer from '../LoadingContainer/LoadingContainer';
import MapView from '../MapView/MapView';

const MapModal = ({
  visible,
  setVisible,
  setCurrentCountry,
  currentCountry,
  availableCountries
}) => {
  const [loading, setLoading] = useState();
  const handleMapPress = async (event) => {
    setLoading(true);
    const address = await getAddressFromCoords(event.coordinate);
    if (!address) {
      showSnackbar(translate('mapModal.notValidCountry'), 'error');
      setLoading(false);
      return;
    }
    const countryCode = getCountryCodeByAddress(address);
    if (!availableCountries.find(({ code }) => code === countryCode)) {
      showSnackbar(translate('mapModal.notAvailableCountry'), 'error');
      setLoading(false);
      return;
    }
    setCurrentCountry(
      availableCountries.find((country) => country.code === countryCode)
    );
    setVisible(false);
    setLoading(false);
    console.log(countryCode);
  };

  const handleMarkWorld = () => {
    setCurrentCountry({ code: COUNTRIES.WORLD });
    setVisible(false);
  };

  return (
    <RNModal visible={visible} setVisible={setVisible}>
      <IconButton
        variant="secondary"
        iconSize="medium"
        icon="back"
        onPress={() => setVisible(false)}
        style={styles.backButton}
      />
      {loading ? <LoadingContainer /> : <MapView onMapPress={handleMapPress} />}
      <Button
        textStyle={styles.globeButtonTextStyle}
        onPress={handleMarkWorld}
        title={translate('mapModal.globeButton')}
        icon="globe"
        style={styles.globeButton}
      />
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: SPACING.medium,
    left: SPACING.medium,
    zIndex: 100
  },
  globeButton: {
    position: 'absolute',
    right: SPACING.medium,
    bottom: SPACING.medium,
    width: 120
  },
  globeButtonTextStyle: {
    top: 1
  }
});

export default MapModal;
