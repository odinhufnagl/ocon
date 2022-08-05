import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';
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
import { PROFILE_SCREEN, PROFILE_STACK } from '../../navigation';
import { useAuthContext } from '../../providers/AuthProvider';
import { POST_POSITIONS } from '../../screens/CameraScreen/CameraScreen';
import {
  handleDownloadImage,
  saveImageToCameraRoll,
  showSnackbar
} from '../../utils';

const Post = ({ post, index, showPlace }) => {
  const navigation = useNavigation();
  const { currentUser } = useAuthContext();
  const [currentUsersTotalReactionsCount, setCurrentUsersTotalReactionsCount] =
    useState(post.currentUsersTotalReactionsCount);
  const [reactionsCount, setReactionsCount] = useState(post.reactionsCount);
  const [backgroundClicks, setBackgroundClicks] = useState();
  const backgroundClicksTimer = useRef();
  const { postType, image, location } = post;

  const [emojisMoving, setEmojisMoving] = useState([]);
  const updateReactionsCount = (emojiName, toAdd) => {
    let reactionsCountCopy = { ...reactionsCount };
    reactionsCountCopy[emojiName] += toAdd;
    setReactionsCount(reactionsCountCopy);
  };
  const handleEmojiClicked = (emojiName) => {
    if (currentUsersTotalReactionsCount >= MAX_REACIONS) {
      showSnackbar(translate('snackbar.maxReactions'), null, 600);
      return;
    }
    createReaction({
      userId: currentUser.id,
      postId: post.id,
      reactionTypeId: REACTION_TYPE_IDS[emojiName]
    });
    setCurrentUsersTotalReactionsCount((prev) => prev + 1);
    updateReactionsCount(emojiName, 1);

    const emojisMovingCopy = [...emojisMoving];
    emojisMovingCopy.push(() => (
      <AnimatedEmoji
        key={currentUsersTotalReactionsCount}
        index={'emoji.key'}
        style={{ bottom: 100 }}
        name={emojiName}
        size={30}
        duration={1500}
      />
    ));
    setEmojisMoving(emojisMovingCopy);
  };

  useEffect(() => {
    console.log('hjelllo');
    if (backgroundClicks == 2) {
      clearTimeout(backgroundClicksTimer.current);
      console.log('Clicked twice');
      setBackgroundClicks(0);
      handleEmojiClicked(
        [EMOJI_NAMES.GRINNING, EMOJI_NAMES.HEART_EYES][
          Math.floor(Math.random() * 2)
        ]
      );
    } else {
      backgroundClicksTimer.current = setTimeout(() => {
        setBackgroundClicks(0);
      }, 500);
    }
  }, [backgroundClicks]);

  const handleBackgroundPress = () => {
    setBackgroundClicks((prev) => prev + 1);
  };

  const navigateToUser = () => {
    navigation.navigate(PROFILE_STACK, {
      screen: PROFILE_SCREEN,
      params: { user: post.createdBy }
    });
  };

  if (postType.position === POST_POSITIONS.FULL) {
    return (
      <TouchableWithoutFeedback
        onPress={handleBackgroundPress}
        style={{ backgroundColor: 'blue', height: '100%', width: '100%' }}
      >
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          resizeMethod="resize"
        >
          {emojisMoving.map((emoji) => emoji())}
          <PostBottomContainer
            onDownloadPress={() => handleDownloadImage(post.image)}
            onAvatarPress={navigateToUser}
            onContainerPress={handleBackgroundPress}
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
            textLeft={location}
            avatarImage={post?.createdBy?.avatar?.image}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
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
          onContainerPress={handleBackgroundPress}
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
          textLeft={location}
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
