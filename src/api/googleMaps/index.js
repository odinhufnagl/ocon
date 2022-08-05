const getMapsURL = (latitude, longitude, resultType, apiKey) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&result_type=${resultType}&key=${apiKey}`;
};
const API_KEY = 'AIzaSyCDhAoY7P9wxpnftyelD6BKn6jbq7slJkk';
const RESULT_TYPE = 'administrative_area_level_2';

export const getAddressFromCoords = async (coords) => {
  const url = getMapsURL(
    coords.latitude,
    coords.longitude,
    RESULT_TYPE,
    API_KEY
  );
  let res = await fetch(url);
  res = await res.json();

  return res.results[0];
};
