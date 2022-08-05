import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChevronRightIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10.7071 7.29289C10.3166 6.90237 9.68342 6.90237 9.29289 7.29289C8.90237 7.68342 8.90237 8.31658 9.29289 8.70711L10.7071 7.29289ZM14 12L14.7071 12.7071C15.0976 12.3166 15.0976 11.6834 14.7071 11.2929L14 12ZM9.29289 15.2929C8.90237 15.6834 8.90237 16.3166 9.29289 16.7071C9.68342 17.0976 10.3166 17.0976 10.7071 16.7071L9.29289 15.2929ZM9.29289 8.70711L13.2929 12.7071L14.7071 11.2929L10.7071 7.29289L9.29289 8.70711ZM13.2929 11.2929L9.29289 15.2929L10.7071 16.7071L14.7071 12.7071L13.2929 11.2929Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default ChevronRightIconSVG;
