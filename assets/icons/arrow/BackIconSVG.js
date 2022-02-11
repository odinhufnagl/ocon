import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.83 5l3.58-3.59L6 0 0 6l6 6 1.41-1.41L3.83 7H16V5H3.83z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default BackIconSVG;
