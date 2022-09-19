import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const UserCheckIconSVG = ({
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
          d="M3 19C3 16.7909 5.68629 15 9 15C12.3137 15 15 16.7909 15 19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.7071 10.7071C22.0976 10.3166 22.0976 9.68342 21.7071 9.29289C21.3166 8.90237 20.6834 8.90237 20.2929 9.29289L21.7071 10.7071ZM17 14L16.2929 14.7071C16.6834 15.0976 17.3166 15.0976 17.7071 14.7071L17 14ZM15.7071 11.2929C15.3166 10.9024 14.6834 10.9024 14.2929 11.2929C13.9024 11.6834 13.9024 12.3166 14.2929 12.7071L15.7071 11.2929ZM20.2929 9.29289L16.2929 13.2929L17.7071 14.7071L21.7071 10.7071L20.2929 9.29289ZM17.7071 13.2929L15.7071 11.2929L14.2929 12.7071L16.2929 14.7071L17.7071 13.2929Z"
          fill="white"
        />
        <Path
          d="M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default UserCheckIconSVG;
