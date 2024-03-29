import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LocationIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 21C12 21 19 16.1538 19 9.92308C19 8.08696 18.2625 6.32605 16.9497 5.02772C15.637 3.72939 13.8565 3 12 3C10.1435 3 8.36301 3.72939 7.05025 5.02772C5.7375 6.32605 5 8.08696 5 9.92308C5 16.1538 12 21 12 21Z"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default LocationIconSvg;
