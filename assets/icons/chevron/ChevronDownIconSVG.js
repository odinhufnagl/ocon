import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ChevronDownIconSVG = ({
  fill = 'black',
  size = { width: '100%', height: '100%' }
}) => {
  return (
    <View style={{ aspectRatio: 1, ...size }}>
      <Svg viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M20.0639 13.6001C20.4412 13.1968 20.4201 12.564 20.0168 12.1867C19.6135 11.8094 18.9807 11.8305 18.6034 12.2338L20.0639 13.6001ZM14.5003 18.0837L13.7701 18.7668C13.9591 18.9689 14.2235 19.0837 14.5003 19.0837C14.7771 19.0837 15.0415 18.9689 15.2306 18.7668L14.5003 18.0837ZM10.3973 12.2338C10.02 11.8305 9.38715 11.8094 8.98383 12.1867C8.58052 12.564 8.55942 13.1968 8.93672 13.6001L10.3973 12.2338ZM18.6034 12.2338L13.7701 17.4005L15.2306 18.7668L20.0639 13.6001L18.6034 12.2338ZM15.2306 17.4005L10.3973 12.2338L8.93672 13.6001L13.7701 18.7668L15.2306 17.4005Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default ChevronDownIconSVG;
