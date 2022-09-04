import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Modal, Spacer, Text } from '../../common';
import { IMAGES, SPACING } from '../../constants';

const getCountryImage = (countryCode) => IMAGES[countryCode];

const CountryModalItem = ({
  image,
  title,
  onPress,
  currentCountry,
  country
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.countryModalItemContainer}
    >
      <Image
        source={getCountryImage(image)}
        style={styles.countryModalItemImage}
      />
      <Spacer orientation="horizontal" />
      <Text type="body" bold={currentCountry.code === country}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const CountriesModal = ({
  visible,
  setVisible,
  countries,
  currentCountry,
  setCurrentCountry
}) => {
  return (
    <Modal visible={visible} setVisible={setVisible}>
      <View style={styles.countryModal}>
        <FlatList
          keyExtractor={(item, index) => item.id}
          style={{ flexGrow: 0 }}
          data={countries}
          renderItem={({ item, index }) => (
            <CountryModalItem
              image={item.code}
              title={item.name}
              country={item.code}
              currentCountry={currentCountry}
              onPress={() => {
                setCurrentCountry(item);
                setVisible(false);
              }}
            />
          )}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  countryModal: {},
  countryModalItemContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.medium,
    alignItems: 'center'
  },
  countryModalItemImage: {
    width: 25,
    height: 25
  }
});

export default CountriesModal;
