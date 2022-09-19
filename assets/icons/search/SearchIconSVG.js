import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SearchIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg
        width={size.width}
        height={size.height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15 15L21 21"
          stroke={fill}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SearchIconSVG;
