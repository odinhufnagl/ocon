import React from 'react';
import { Dimensions } from 'react-native';
import { Carousel, PostCard } from '..';
const { width: windowWidth } = Dimensions.get('window');

const PostCardsCarousel = ({ data, postCardType = 'large', postCardStyle }) => {
  const renderItem = ({ item, index }) => {
    return <PostCard type={postCardType} style={postCardStyle} post={item} />;
  };
  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      itemWidth={windowWidth * 0.8}
      inactiveSlideScale={0.85}
    />
  );
};

export default PostCardsCarousel;
