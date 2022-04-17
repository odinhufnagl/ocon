import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import happy from '../../../assets/images/happyEmoji/happyEmoji.png';
import heartEyes from '../../../assets/images/heartEyesEmoji/heartEyesEmoji.png';
import { ConditionalWrapper, Spacer, Text } from '../../common';
import { EMOJI_NAMES, SPACING } from '../../constants';

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
  textLeftStyle,
  textLeftType = 'header',
  style,
  textLeftUpper,
  textLeftUpperStyle,
  textLeftUpperType = 'largeHeader'
}) => {
  return (
    <ConditionalWrapper
      condition={showGradient}
      wrapper={(children) => (
        <LinearGradient
          style={[styles.container, style]}
          colors={['#00000000', '#000']}
        >
          {children}
        </LinearGradient>
      )}
    >
      <ConditionalWrapper
        condition={!showGradient}
        wrapper={(children) => <View style={styles.container}>{children}</View>}
      >
        {textLeftUpper ? (
          <Text
            type={textLeftUpperType}
            style={[styles.textLeftUpper, textLeftUpperStyle]}
          >
            {textLeftUpper}
          </Text>
        ) : (
          <Spacer spacing="large" />
        )}
        <View style={styles.bottomContainer}>
          <Text type={textLeftType} style={textLeftStyle}>
            {textLeft}
          </Text>

          <View style={styles.rightContainer}>
            {emojis &&
              emojis?.map(({ count, onPress, name, style }, index) => (
                <View key={name} style={styles.emojiContainer}>
                  {onPress ? (
                    <TouchableOpacity onPress={() => onPress(name)}>
                      <Image
                        source={getEmojiImageSource(name)}
                        style={[styles.emoji, style]}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                      source={getEmojiImageSource(name)}
                      style={[styles.emoji, style]}
                    />
                  )}
                  <Spacer orientation="horizontal" spacing="tiny" />
                  <Text type="body" bold>
                    {count}
                  </Text>
                  {index !== emojis?.length - 1 && (
                    <Spacer orientation="horizontal" spacing="medium" />
                  )}
                </View>
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
    paddingBottom: SPACING.small
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  emoji: {
    width: 30,
    height: 30,
    position: 'relative',
    bottom: 2
  },
  emojiContainer: { flexDirection: 'row', alignItems: 'center' },
  textLeftUpper: {
    position: 'relative',
    top: 8
  }
});

export default PostBottomContainer;
