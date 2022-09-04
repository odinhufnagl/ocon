import { PERMISSIONS } from '../constants';
import { hasPermission } from './permission';
import Geolocation from '@react-native-community/geolocation';
export const getGeoLocation = async (onSuccess) => {
  if (!(await hasPermission(PERMISSIONS.LOCATION))) {
    return;
  }
  const config = {
    enableHighAccuracy: false
  };
  Geolocation.getCurrentPosition(
    (location) => onSuccess(location),
    (e) => console.log(e),
    config
  );
};

export const getCountryCodeByAddress = (address) => {
  const countryCode = address.address_components.find(({ types }) =>
    types.includes('country')
  ).short_name;
  return countryCode;
};
export const getFormattedAddressByAddress = (address) =>
  address.formatted_address;
