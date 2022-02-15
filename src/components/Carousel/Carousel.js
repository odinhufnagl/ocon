import React from 'react';
import { Dimensions } from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';
const { width: windowWidth } = Dimensions.get('window');

const Carousel = (
  {
    renderItem,
    data,
    itemWidth = windowWidth * 0.2,
    sliderWidth = windowWidth,
    inactiveSlideOpacity = 0.5,
    inactiveSlideScale = 0.6,
    onSnapToItem,
    firstItem
  },
  ...props
) => {
  return (
    <SnapCarousel
      data={data}
      renderItem={renderItem}
      itemWidth={itemWidth}
      sliderWidth={sliderWidth}
      inactiveSlideOpacity={inactiveSlideOpacity}
      inactiveSlideScale={inactiveSlideScale}
      onSnapToItem={(index) => onSnapToItem(data[index], index)}
      firstItem={firstItem}
      {...props}
    />
  );
};
export default Carousel;
