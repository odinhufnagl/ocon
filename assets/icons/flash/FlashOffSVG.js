import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FlashOffIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M3.27 3L2 4.27L7 9.27V13H10V22L13.58 15.86L17.73 20L19 18.73L3.27 3ZM17 10H13L17 2H7V4.18L15.46 12.64L17 10Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default FlashOffIconSvg;
