import { COUNTRIES, IMAGES } from '../constants';

export const getCountryImage = (country) => {
  if (country?.code === COUNTRIES.WORLD) {
    return IMAGES.WORLD;
  }
  return { uri: country?.image };
};
