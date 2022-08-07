import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ImageIconSvg = ({
  fill = 'white',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4Z"
          stroke={fill}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3 17.0001L8.22999 10.8984C8.63274 10.4285 9.36128 10.4336 9.75746 10.909L13.299 15.1588C13.6754 15.6106 14.3585 15.6415 14.7743 15.2257L16.21 13.7901C16.6314 13.3686 17.3256 13.4071 17.698 13.8725L21 18.0001"
          stroke={fill}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9C16 9.55228 15.5523 10 15 10C14.4477 10 14 9.55228 14 9Z"
          stroke={fill}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default ImageIconSvg;
