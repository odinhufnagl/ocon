import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SendIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill={fill} />
      </Svg>
    </View>
  );
};

export default SendIconSVG;
