import RNSlider from '@react-native-community/slider';
import React from 'react';
import { View } from 'react-native';

const Slider = ({
  value,
  onChange,
  width = 150,
  height = 40,
  min = 0,
  max = 100
}) => {
  return (
    <View
      style={{
        transform: [{ rotateZ: '-90deg' }],
        marginRight: -1 * height
      }}
    >
      <RNSlider
        value={value}
        onValueChange={onChange}
        minimumValue={0}
        maximumValue={200}
        step={1}
        style={{
          width: width,
          height: height,
          backgroundColor: 'blue'
        }}
      ></RNSlider>
    </View>
  );
};
export default Slider;
