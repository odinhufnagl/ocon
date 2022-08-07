import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import { PostBottomContainer } from '..';
import { DIMENS } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { getDateFromTimestamp } from '../../utils';

export const POST_CARD_TYPES = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small'
};

const getContainerStyle = (postCardType) => {
  switch (postCardType) {
    case POST_CARD_TYPES.LARGE:
      return styles.largeContainer;
    case POST_CARD_TYPES.MEDIUM:
      return styles.mediumContainer;
    case POST_CARD_TYPES.SMALL:
      return styles.smallContainer;
    default:
      return styles.largeContainer;
  }
};

const PostCard = ({ post, type, style, onPress = () => {} }) => {
  if (!post) {
    return <View></View>;
  }
  const { theme } = useTheme();
  const { image, createdAt, thumbnail } = post;

  return (
    <TouchableWithoutFeedback onPress={() => onPress(post)}>
      <View
        style={[
          styles.defaultContainerStyle(theme),
          getContainerStyle(type)(theme),
          style
        ]}
      >
        <Image
          source={{ uri: image || thumbnail }}
          style={styles.imageBackground}
          resizeMethod="resize"
        />

        {/* <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
          {
            <PostBottomContainer
              textLeftType="header"
              textLeft={
                type === POST_CARD_TYPES.LARGE &&
                getDateFromTimestamp(createdAt)
              }
              showGradient={type === POST_CARD_TYPES.LARGE}
            />
          }
        </ImageBackground>*/}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  defaultContainerStyle: (theme) => ({
    borderRadius: 4,
    overflow: 'hidden'
  }),
  largeContainer: (theme) => ({
    width: '100%',
    aspectRatio: 1.2
  }),
  mediumContainer: (theme) => ({
    width: '100%',
    aspectRatio: 2
  }),
  smallContainer: (theme) => ({
    width: '30%',
    aspectRatio: 0.6
  }),
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  }
});

export default PostCard;
