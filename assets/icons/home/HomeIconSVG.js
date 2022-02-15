import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const HomeIconSvg = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M19.6585 9.70116L12.6585 3.57616C12.2815 3.24626 11.7185 3.24626 11.3415 3.57616L4.3415 9.70116C4.12448 9.89105 4 10.1654 4 10.4537V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 10.4477 14 11 14H13C13.5523 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V10.4537C20 10.1654 19.8755 9.89105 19.6585 9.70116Z"
          stroke={fill}
          fill="none"
          stroke-width="5"
        />
      </Svg>
    </View>
  );
};

export default HomeIconSvg;
