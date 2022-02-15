import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const FlashOnIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M7 2V13H10V22L17 10H13L17 2H7Z" fill={fill} />
      </Svg>
    </View>
  );
};

export default FlashOnIconSvg;
