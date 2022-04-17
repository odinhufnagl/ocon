import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { AnimatedEmoji } from 'react-native-animated-emoji';
import LinearGradient from 'react-native-linear-gradient';
import { ImageMiddle, PostBottomContainer } from '..';
import { createReaction } from '../../api/graphql/requests';
import {
  COUNTRY_CODES,
  EMOJI_NAMES,
  MAX_REACIONS,
  REACTION_TYPE_IDS
} from '../../constants';
import { translate } from '../../i18n';
import { useAuthContext } from '../../providers/AuthProvider';
import { POST_POSITIONS } from '../../screens/CameraScreen/CameraScreen';
import { showSnackbar } from '../../utils';

const Post = ({ post, index, showPlace }) => {
  const { currentUser } = useAuthContext();
  const [totalReactions, setTotalReactions] = useState(
    post.currentUsersTotalReactionsCount
  );
  const [reactionsCount, setReactionsCount] = useState(post.reactionsCount);

  const { postType, image, city, country } = post;

  const [emojisMoving, setEmojisMoving] = useState([]);
  const updateReactionsCount = (emojiName, toAdd) => {
    let reactionsCountCopy = { ...reactionsCount };
    reactionsCountCopy[emojiName] += toAdd;
    setReactionsCount(reactionsCountCopy);
  };
  const handleEmojiClicked = (emojiName) => {
    if (totalReactions >= MAX_REACIONS) {
      showSnackbar(translate('snackbar.maxReactions'), null, 600);
      return;
    }
    createReaction({
      userId: currentUser.id,
      postId: post.id,
      reactionTypeId: REACTION_TYPE_IDS[emojiName]
    });
    setTotalReactions((prev) => prev + 1);
    updateReactionsCount(emojiName, 1);

    const emojisMovingCopy = [...emojisMoving];
    emojisMovingCopy.push(() => (
      <AnimatedEmoji
        key={totalReactions}
        index={'emoji.key'}
        style={{ bottom: 100 }}
        name={emojiName}
        size={30}
        duration={1500}
      />
    ));
    setEmojisMoving(emojisMovingCopy);
  };

  if (postType.position === POST_POSITIONS.FULL) {
    return (
      <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
        {emojisMoving.map((emoji) => emoji())}

        <PostBottomContainer
          textLeftUpper={showPlace && '#' + parseInt(index + 1)}
          showGradient
          emojis={[
            {
              name: EMOJI_NAMES.GRINNING,
              count: reactionsCount[EMOJI_NAMES.GRINNING],
              onPress: handleEmojiClicked
            },
            {
              count: reactionsCount[EMOJI_NAMES.HEART_EYES],
              onPress: handleEmojiClicked,
              name: EMOJI_NAMES.HEART_EYES
            }
          ]}
          textLeft={`${city}, ${COUNTRY_CODES[country]}`}
        />
      </ImageBackground>
    );
  }

  if (postType.position === POST_POSITIONS.MIDDLE) {
    return (
      <LinearGradient
        style={styles.linearGradient}
        colors={[postType.colorTop, postType.colorBottom]}
      >
        {emojisMoving.map((emoji) => emoji())}
        <View style={styles.imageMiddle}>
          <ImageMiddle imageUri={image} />
        </View>
        <PostBottomContainer
          textLeftUpper={showPlace && '#' + parseInt(index + 1)}
          emojis={[
            {
              name: EMOJI_NAMES.GRINNING,
              count: reactionsCount[EMOJI_NAMES.GRINNING],
              onPress: handleEmojiClicked
            },
            {
              count: reactionsCount[EMOJI_NAMES.HEART_EYES],
              onPress: handleEmojiClicked,
              name: EMOJI_NAMES.HEART_EYES
            }
          ]}
          textLeft={`${city}, ${COUNTRY_CODES[country]}`}
        />
      </LinearGradient>
    );
  }
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  imageMiddle: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,

    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Post;
