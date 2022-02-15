import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const CloseIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 14 14" fill="black" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M12.59 0L7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41 12.59 0z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default CloseIconSvg;
