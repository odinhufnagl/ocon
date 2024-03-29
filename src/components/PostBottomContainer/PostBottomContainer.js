import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgUri } from 'react-native-svg';
import happy from '../../../assets/images/happyEmoji/happyEmoji.png';
import heartEyes from '../../../assets/images/heartEyesEmoji/heartEyesEmoji.png';
import {
  ConditionalWrapper,
  Icon,
  IconButton,
  Spacer,
  Text
} from '../../common';
import { EMOJI_NAMES, SPACING } from '../../constants';

import { useTheme } from '../../hooks';
import { saveImageToCameraRoll } from '../../utils';

const getEmojiImageSource = (emojiName) => {
  switch (emojiName) {
    case EMOJI_NAMES.HEART_EYES:
      return heartEyes;
    case EMOJI_NAMES.GRINNING:
      return happy;
    default:
      return heartEyes;
  }
};

const PostBottomContainer = ({
  emojis,
  textLeft,
  showGradient,
  textLeftStyle = { color: 'white' },
  textLeftType = 'body',
  textLeftSmall,
  avatarImage,
  onAvatarPress,
  onDownloadPress,
  textLeftUpper,
  username,
  onusernamePress,
  style
}) => {
  const { theme } = useTheme();
  return (
    <ConditionalWrapper
      condition={showGradient}
      wrapper={(children) => (
        <LinearGradient
          style={[styles.container, style]}
          colors={['#00000000', 'rgba(0, 0, 0, 0.6)']}
        >
          {children}
        </LinearGradient>
      )}
    >
      <ConditionalWrapper
        condition={!showGradient}
        wrapper={(children) => <View style={styles.container}>{children}</View>}
      >
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            <Text type="heading">{textLeftUpper}</Text>
            <View style={styles.usernameContainer}>
              <Icon
                variant="profile"
                fill="white"
                size="small"
                style={{ position: 'relative', bottom: 2 }}
              />
              <Spacer spacing="small" orientation="horizontal" />
              <TouchableOpacity onPress={onusernamePress}>
                <Text bold>{username}</Text>
              </TouchableOpacity>
            </View>
            <Spacer spacing="tiny" />
            <View style={styles.locationContainer}>
              {/*<Icon
                variant="location"
                fill="white"
                size="small"
                style={{ position: 'relative', bottom: 2 }}
              />
      <Spacer spacing="small" orientation="horizontal" />*/}
              <Text type={textLeftType} style={textLeftStyle}>
                {textLeft}
              </Text>
            </View>
            <Spacer spacing="tiny" />
            <Text type="small">{textLeftSmall}</Text>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={onAvatarPress}
              style={styles.avatar(theme)}
            >
              <Image
                source={{ uri: avatarImage }}
                style={{ width: 55, height: 55, borderRadius: 100 }}
                resizeMethod="resize"
              />
            </TouchableOpacity>
            <Spacer spacing={25} />
            <IconButton
              icon="download"
              variant="transparent"
              style={styles.downloadButton(theme)}
              onPress={onDownloadPress}
            />
            <Spacer spacing={20} />
            {emojis &&
              emojis?.map(({ count, onPress, name, style }, index) => (
                <>
                  {index !== 0 && <Spacer spacing="tiny" />}
                  <View key={name} style={styles.emojiContainer}>
                    <TouchableOpacity
                      onPress={() => onPress(name)}
                      style={styles.emojiButton(theme)}
                    >
                      <Image
                        source={getEmojiImageSource(name)}
                        style={[styles.emoji, style]}
                        resizeMethod="resize"
                      />
                    </TouchableOpacity>
                    <Text type="body" bold>
                      {count}
                    </Text>
                  </View>
                </>
              ))}
          </View>
        </View>
      </ConditionalWrapper>
    </ConditionalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.large,
    justifyContent: 'flex-end'
  },
  bottomContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  linearGradient: {
    width: '100%',
    height: '100%'
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftContainer: {
    alignSelf: 'flex-end',
    width: '65%'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%'
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    width: 30,
    height: 30
  },
  emojiButton: (theme) => ({
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    padding: SPACING.small
  }),
  emojiContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  textLeftUpper: {
    position: 'relative',
    top: 8
  },
  avatar: (theme) => ({
    position: 'relative',
    borderRadius: 10000,

    backgroundColor: theme.backgroundColor,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  rightRadialGradient: {
    width: 300,
    height: 400,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  downloadButton: (theme) => ({
    // backgroundColor: theme.backgroundColor,
    width: 30 + 16,
    height: 30 + 16
  })
});

export default PostBottomContainer;
